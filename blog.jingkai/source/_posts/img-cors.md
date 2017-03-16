---
title: 非跨域图片缓存导致跨域图片请求失败
tags:
  - frontend
date: 2017-03-02 23:55:14
thumbnail:
---


前阵子同事子龙遇到了一个BUG，百思不得其解。问题是这样的：

一个活动页面需要在进入页面前预加载页面资源（图片、音乐等），预加载图片的放假就是创建一个`img`标签，然后通过设置它的**src**属性来加载图片，使其被浏览器缓存，以此来保证图片在活动页面的后续使用中会从缓存中读取。代码大概是这样：

```javascript
let img = new Image();
img.src = 'https://xxxxxx';
img.onload = function() {/* blabla */};
```

但奇怪的是在后面真正加载这张图片到canvas中的时候发生了CORS error（跨域请求错误），使用处代码类似这样：

```javascript
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');

let img = new Image();
img.src = 'https//xxxxxx';
img.crossOrigin = 'annonymous';
img.onload = function() {
	context.drawImage(this, 0, 0);
};
```

没错，这段代码跟上面加载图片地方的唯一差别就是这里把**crossOrigin**属性设置成了annonymous。（因为要在canvas里面使用，图片存储在不同域文件服务器上）

这个问题tricky的地方在于，在本地测试的时候是好的，一发到测试环境就不行，图片总是加载不了。



这段代码应该是没什么问题，那问题到底出在什么地方？



仔细考虑本地环境和测试环境的差别后我突然想到，本地环境是**disable cache**的，测试环境有缓存！然后仔细观察了下测试环境预加载图片的请求，发现在一开始预加载图片时图片的response header中确实**没有**Access-Control-Allow-Origin。

那么问题就显而易见了，google之发现，原来早在**14年**就有人给chromium提了这个[issue](https://bugs.chromium.org/p/chromium/issues/detail?id=409090)了，并且开发团队认为`current behavior is correct`。



**所以产生这个问题的原因是这样：**

首先，对于设置了跨域资源共享（CORS）的服务器，如果你的图片请求没有标记为crossorigin，那么这次图片加载不会被当作跨域请求来处理，也就是response header中不会包含CORS headers。

然后，浏览器会把图片的**跨域和非跨域请求当作同一个请求**来缓存（url不变的情况下）。那么在上面所说的情况下，我们第一次用**非跨域**请求加载了一张图片，浏览器把response缓存起来了（没有CORS headers），当第二次以**跨域**方式请求同一张图片时候，浏览器认为这张图片是之前被缓存的那张，就直接返回了**被缓存的response**，而这个response header中是没有CORS的，所以浏览器就认为这次跨域请求不被允许，block了这次请求。

（写了一个[fiddle](http://jsfiddle.net/jingkaizhao/5g8spmec/32/)演示这个问题，在Chrome56中依然能重现）



找到问题的话解决方案就很简单了——预加载时对以后需要用跨域方式加载的图片也设置`crossOrigin='annonymous'`就好了。

