---
title: Travis CI部署到VPS
tags:
  - frontend
  - CI
date: 2017-05-30 22:04:01
---


一般用Travis CI都是跑测试、发布npm包之类的，最近想给部署在自己的VPS上的jingkaizhao.com配置上Travis CI没想到却遇到了问题...

<!-- more -->

访问VPS的方法是SSH，部署hexo用的是`rsync`，但是在Travis CI的机器上怎样才能SSH到VPS上呢？（不能把密码写进blog的repo里，也不能把private key写进去）

记录下解决的方法：

### 创建ssh key

``` bash
ssh-keygen
```

创建好后其实key都在本地，需要把public key传到vps上，写进`.ssh/authorized_keys`里面，我选择用`scp`：

``` bash
scp .ssh/id_rsa.pub jingkai@jingkaizhao.com:~/.ssh/authorized_keys
```

（因为我没有其他的ssh key要用，直接替换掉！）

这里其实传完public key之后就可以把它删掉了，本机用不到它，至于private key，把它移动到项目根目录下，改个名（pvt-key）备用。



### 加密private key

这步比较关键，也是我们本来的目的，这里用到的其实是Travis的[Encryption keys](https://docs.travis-ci.com/user/encryption-keys/)。

这里官方提供的是一个叫`travis`的ruby gem，实际上有个大哥写了[travis-encrypt](https://www.npmjs.com/package/travis-encrypt)在npm上也可以用。不过`travis-encrypt`的命令设计有点反人类，所以...还是老老实实用官方的gem吧。

``` bash
# 在项目根目录下
gem install travis # 安装travis工具，需要ruby环境
travis login # 登陆travis，要求账号密码
travis encrypt-file pvt-key --add # 加密private key
```

加密完成后travis会在生成一个`pvt-key.enc`然后在你的`.travis.yml`里面加上一行：

``` yaml
before_install:
- openssl aes-256-cbc -K $encrypted_a11b22c33de_key -iv $encrypted_a11b22c33de_iv -in pvt-key.enc -out pvt-key -d
```

这句就是用来在Travis在执行CI之前把你刚才加密的文件decrypt到对应名字的文件（pvt-key）中。

**这步完成后private key也不需要存在了，把`pvt-key`（不是pvt-key.enc）删掉，避免提交到repo里。**



### install.sh

准备工作OK了，现在需要保证每次Travis在执行CI任务之前把private key解密然后放进`.ssh`目录中。这里我们可以写个shell脚本来做这件事：

``` bash
#!/bin/bash
set -x # 显示脚本输出
    
# 解密pvt-key
openssl aes-256-cbc -K $encrypted_a11b22c33de_key -iv $encrypted_a11b22c33de_iv -in pvt-key.enc -out pvt-key -d
rm pvt-key.enc # 不需要了
chmod 600 pvt-key
mv pvt-key ~/.ssh/id_rsa # 放进ssh目录
```

然后把这个脚本放进`.travis.yml`的before_install中：

``` yaml
before_install:
- ./install.sh
```



### 添加ssh known host

做完上一步之后其实基本上就OK了，这时候运行一下Travis build会发现卡在一个问你yes or no的地方...

其实是ssh在问你要不要相信`jingkaizhao.com`，当然是选择相信它啊～在`.travis.yml`中加入：

``` yaml
addons:
  ssh_known_hosts:
  - jingkaizhao.com:1024
```



这时候再去运行一下Travis build，done！