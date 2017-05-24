---
title: 在Gitlab上搭建持续集成环境
tags:
  - FE
date: 2017-05-17 00:52:02
---


公司内部私有npm registry上公用包越来越多，大部分由我一个人维护，每次修改发布新版本时候着实蛋疼，重复工作巨多。好在是我们用的是私有化部署的Gitlab，自由度很高，而Gitlab本身CI支持也比较完善，折腾一下解放双手！

<!-- more -->

## 准备工作

简单读了一下文档（[https://docs.gitlab.com/ee/ci/](https://docs.gitlab.com/ee/ci/)），Gitlab的CI跟Travis CI基本是同样的套路，就是你写一个yaml文件，定义你需要跑的jobs，然后由`Gitlab Runners`来帮你去执行。只不过在Travis上，“Runner”已经帮你配制好了。

> Ideally, GitLab Runner should not be installed on the same machine as GitLab. 

所以准备工作就是：去找后端同学帮忙开一台独立服务器...



## 创建Gitlab Runner

在后端同学座位前长跪一天后终于求来了一台server，下面需要配置用来跑发布任务的Runner。

文档里会告诉你有两种Runner可以配置，`Shared Runner` or `Specific Runner`。二者的区别就是：Shared Runner能被多个项目使用，Specific Runner只能被一个项目使用，所以像现在的这个模式下（发布npm模块）使用Shared Runner十分合适。实际这里还会有个小坑，后面会说到。

官方提供了几种不同的部署Runner的方法（[https://docs.gitlab.com/runner/install/](https://docs.gitlab.com/runner/install/))，虽然官方推荐使用“Gitlab repository“的方法部署，但是我还是选择了用Docker部署。

这里不得不说下，在条件允许的情况下，我更推荐使用Docker部署。尤其是在每个Runner负载不高的情况下，使用Docker部署可以更加方便地在同一台服务器上创建多个Runner，并使它们互不影响。而且由于Gitlab Runner是一个主动服务，不需要把Runner作为一个服务暴露给Gitlab，而是把相应的Gitlab地址配置给Runner就可以了，也降低了用Docker部署的复杂程度，毕竟只要你的Docker能访问外网就可以了。

---

OK，现在开始在服务器上创建Gitlab Runner的Docker容器，用了[docker-compose](https://docs.docker.com/compose/)，按照文档，写出这样的compose文件：

```yml
npm-runner:
  restart: always
  image: gitlab/gitlab-runner:latest
  volumes:
    - ./config:/etc/gitlab-runner
    - /var/run/docker.sock:/var/run/docker.sock
```

稍微解释下干了些什么：

首先用的镜像是官方提供的gitlab/gitlab-runner。

然后最主要需要说的是**volumes**这个地方，挂载了两个文件（文件夹）进到容器中：

`./config:/etc/gitlab-runner`挂载了一个配置文件夹，里面放置了对于这个Runner的配置文件，按照Gitlab Runner的要求，在compose文件**同级文件夹下**创建一个config文件夹，然后在config目录下创建一个`config.toml`配置文件，内容如下：

```toml
concurrent = 1
check_interval = 0

[[runners]]
  name = "npm-runner"
  url = "your gitlab host"
  token = "your runner token"
  limit = 0
  executor = "docker"
  builds_dir = ""
  shell = ""
  environment = ["LC_ALL=en_US.UTF-8"]
  disable_verbose = false
  [runners.docker]
    image = "node:latest"
    privileged = false
    disable_cache = false
    wait_for_services_timeout = 30
    cache_dir = ""
    volumes = ["/cache"]
    allowed_images = ["node:*"]
    
```

*这个配置文件中有一部分是没用的（捂脸），但是有一些项十分关键：**[runners.docker]**这个属性指定了执行job的Docker镜像（没错，**Runner本身就是基于Docker的**），因为我们主要执行的是npm发布，所以这里使用的镜像是node:latest，然后**allowed_images**指定了允许job选择所有node镜像作为运行容器。*



`/var/run/docker.sock:/var/run/docker.sock`挂载了Docker运行文件，前面说了，Runner也是基于Docker的，在执行任务的时候需要动态创建容器，所以我们把服务器上的Docker文件挂载进去给它用。

写好compose文件后执行`docker-compose up`启动（BTW：`docker-compose up -d`让容器在后台运行），成功启动后Runner就创建好了。



## 注册、配置Gitlab Runner

创建好Runner后首先需要注册它（[Register Runner](https://docs.gitlab.com/ee/ci/runners/README.html#creating-and-registering-a-runner)）：

```bash
# npm-runner是container的名字
docker exec -it npm-runner gitlab-runner register 

Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
https://yourhost.com
Please enter the gitlab-ci token for this runner
xxx
Please enter the gitlab-ci description for this runner
npm-runner
INFO[0034] fcf5c619 Registering runner... succeeded
Please enter the executor: shell, docker, docker-ssh, ssh?
docker
Please enter the Docker image (eg. ruby:2.1):
node:latest
INFO[0037] Runner registered successfully. Feel free to start it, but if it's
running already the config should be automatically reloaded!
```

按照提示一步步填就好了，关于token这个东西，需要用管理员账号登陆Gitlab，然后进入`https://yourhost.com/admin/runners`页面就能拿到了。这里吐槽两句，这里提示让你填的的name啦、token啦都会生效，但是**executor**和**Docker image**都没有用，所以前面才会说到在`config.toml`里面的这项配置很重要，当然也有可能是我的姿势不对～



这样就注册好一个Runner了，默认情况下这个Runner就是**Shared Runner**。这时再进入`https://yourhost.com/admin/runners`就能看到：

![](/images/runners.jpeg)



可以点进Edit里面看看，但是千万不要手贱去点`Restrict projects for this Runner`下面的**Enable**按钮，这就是我前面说的坑。因为你一Enable，这个Runner就变成**Specific Runner**了，而且**不可逆！**只能删掉重新注册！



## 给具体项目配置CI Jobs

很简单，在对应repo的根目录下创建**.gitlab-ci.yml**文件，内容大致如下：

```yml
image: node:latest

before_script:  
  - npm install --registry=https://registry.yourhost.com

cache:  
  paths:
    - node_modules/

publish:  
  stage: deploy
  tags:
    - FE
    - HPM
  only:
    - tags
    - triggers
  script:
    - npm run build
    - echo '//registry.yourhost.com/:_authToken=${HPM_TOKEN}'>.npmrc
    - npm publish --registry=https://registry.yourhost.com

```

真正指定要跑的脚本是**scripts**属性下面的内容，但是有一个属性很关键——**tags**。

tags里面我写了两个标签，这是对应Runner中的标签（参见上面Runner的图中标签）。具体的意思是，你可以给一个Runner设置标签，然后把Runner设置成tags only，这样的话如果一个job没有指定对应标签的话那么就不会触发这个Runner去执行它，这在有很多个项目和很多个Runner的情况下十分有用。所以这里如果我们把tags去掉的话实际上是不会出发我们的Runner去执行它的。

再说**script**下面执行的东西，其实很简单，就是build一下然后publish，中间那句echo是把npm registry的authToken给输出到.npmrc文件中，这样就不用手动去登陆了。这里面的`${HPM_TOKEN}`表示一个变量，这个变量可以在对应项目的`settings/ci_cd`下的**Secret Variables**中设置（顺便可以检查下**Shared Runners**里面能看到你刚刚创建的Runner）。

然后对于这个publish这个job我设置了`only: -tags`这个属性，也就是说必须提交一个git tag才能触发这个任务，跟`npm version xxx`生成tag十分契合。



## 试一下

到此Runner和CI就设置完成啦，来试一下！

```bash
npm version patch
git push --follow-tags
```

就OK了，去项目下面的**Pipeline**下面应该就能看到对应的CI build了：

Pipline列表中多出来一条

![](/images/ci-success-1.png)



点进去看看：

![](/images/ci-success-2.png)

