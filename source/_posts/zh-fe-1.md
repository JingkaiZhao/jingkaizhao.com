---
title: 小创业公司前端修仙之路（一）
tags:
  - frontend
date: 2017-12-12 22:24:51
---


本来想起的名字叫做**《再惠前端技术架构演进之路》**，想想有点装逼，最终还是换成了这么个题目。但是想说的东西差不多，就那么个意思。

<!-- more -->

## 前言

掐指一算很快就是在[再惠](https://www.kezaihui.com)度过的第二个元旦了。创业公司的经历真的丰富，眼看着公司从天使轮融到了B轮，前端团队从1个人到9个人，有一丝小小的成就感。随之而来的是之前欠下的技术债也慢慢显露出来了，在重新整理前端架构之前，先来总结下这两年都做了些啥吧。

*本来想起的名字叫做**《再惠前端技术架构演进之路》**，想想有点装逼，最终还是换成了这么个题目。但是想说的东西差不多，就那么个意思。*



## 筑基期

>  刚到公司的时候，他们后端也写前端代码，前端也写后端代码…我大概算是第一个“专业”前端吧...



### 框架&基础

这个时期的开发基本上是“全栈开发”的模式，稍微好那么一点的地方是从一开始就走了前后端分离的路。虽然前后端分离，但是入口还是丢在了后端Django的服务器上，此时Web服务的入口就是一个Django的template。

前端所有项目，不管是2C的还是2B的，不管是跑在手机上的还是跑在PC上的，用的都是AngularJS (1.4.x)。模块加载用的是AMD的RequireJS，打包脚本用grunt来跑（基本只是RequireJS的打包和uglify这么两件事）。

dev-server？不存在的，开发环境直接通过RequireJS来异步加载一个个文件...

ES2015？不存在的，没有babel这回事...

SASS or Less？不存在的，直接写CSS...



### 结构

项目的结构是所有代码在同一个repo下面，大致的结构可以描述成这样：

```
- /
  - apps // 所有前端代码
  	- common // 基础utilities
  	- app1 // 各个SPA的代码
  	- app2
  	- app3
  	  Gruntfile.js
  - api // 后端API
  - core // Web入口
  - ...
```



### 发布

发布脚本是用[fabric](http://www.fabfile.org/)来写的（不得不说，fabric挺好用的），前端的发布其实主要就是跑grunt build，然后把构建出来的静态资源丢到文件服务器（AWS S3）上。虽然在前后端分离的情况下，我们这种客户端SPA的发布和后端没什么关系，但是由于静态文件的加载用了是Django自带的[staticfiles](https://docs.djangoproject.com/en/2.0/ref/contrib/staticfiles/)，所以前后端发布是在一起进行的。

简单解释下staticfiles这个东西：

* 首先在settings中会定义`STATIC_URL`这个东西，开发环境和产品环境可能不同，开发环境可能是`/static/`，而产品环境可能是`https://cdn.domain.com/static/`（类似publicPath）

* Django的模版里面，加载静态资源时用模版语法`static`，写成这样：

  ```html
  <script src="{% static "js/app.js" %}"></script>
  ```

* 上传文件到文件服务器时，用Django的[collectstatic](https://docs.djangoproject.com/en/2.0/ref/contrib/staticfiles/#collectstatic)来上传，上传时会给每个静态资源加上hash，然后生成一个保存hash前后文件名mapping的`staticfiles.json`，并且一并上传到文件服务器上。

* 这样当访问Django模版时候，Django就会自己把静态资源地址转换成`https://cdn.domain.com/static/js/app.a2df33ab1e.js`。



大概就是这么些东西，这个时候发布还是挺简单的，跑一个`fab deploy`就好了。其实我们都是在发版时用自己的电脑跑的发布脚本。



## 结丹期

> 还是要与时俱进啊，我不是来考古的...



其实之前的技术栈&架构在业务简单，只有一个人开发前端的时候可以用“**挺方便的**”来形容。

但是当有两个人一起开发的时候…我现在还依稀记得，一个7000行的CSS文件，两个人同时修改，最后提交代码时候被merge conflicts支配的恐惧。



### 拥抱Webpack

在度过了愉（keng）快（die）的两个月后，我感觉不能继续忍受下去了，决定给构建系统开刀。第一件事就是把RequireJS + Grunt切换至Webpack。

有了Webpack后，我们终于能够：

* ES2015+
* resource (css, image, …) as module
* HMR
* SCSS

值得一说的是，在CSS（预）编译器的选择上，最终确定了SASS，没有选择更简单的Less和更与时俱进的PostCSS。没有选择Less是因为能力比SASS弱不少（事实证明，SASS多处的那些东西基本没用到…），而没选PostCSS是因为，当时没有意识到PostCSS也可以用来做预编译。不过，选择SASS并不算一个错误的选择，唯一令人头疼的是安装`node-sass`比较慢，会拖慢CI的速度。



虽然决定了切换到Webpack，但是之前用RequireJS实现的代码并不能无缝迁移（即便Webpack支持AMD，但早期的代码里存在各式各样的魔法）。权衡之后，最终的方案是：新的项目使用Webpack构建，老的项目暂时不动。



这个时期还有件有（cao）趣（dan）的事：另一个前端同学**转！产！品！经！理！**了！虽然不会马上就不干活，但是名义上前端团队又只剩下我自己了～



To Be Continued