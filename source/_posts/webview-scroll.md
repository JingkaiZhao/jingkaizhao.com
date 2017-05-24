---
title: 微信内scroll事件问题
date: 2016-08-20 23:20:32
tags:
- frontend
- DOM
---

有个需求：

页面（移动端）中部有个toolbar，希望实现当页面向上滚动时，如果toolbar碰到了页面顶端就fix在页面顶端（也就是滚着滚着然后toolbar吸在屏幕顶端的感觉）。

<!-- more -->

想到最简单的实现方法就是监听scroll事件，判断scrollTop，当scrollTop达到某个值时，把toolbar设成`position:fixed; top: 0;`。So easy...

But...

移动端iOS8下，当滚动的时候，toolbar总是吸不住！具体表现为当“用力”往上一滑时，页面会一直向上滚，然后等滚动停止之后toolbar才fix在顶部。感觉是设置`style.positoin = 'fixed'`的代码延迟到滚动结束才执行。

Google之，发现：

`iOS7 or < Android 2.3浏览器内scroll事件触发的时候会暂停JavaScript的执行`

暂停JavaScript执行！（据称是为了使滚动获得较流畅的体验）就是当滚动的时候时间静止了，一切脚本都没法起作用！完全没办法解决啊！

等等！不是iOS7吗？为什么iOS8还是不行...

继续Google：

`iOS8 Safari和WKWebView修复了这个问题，但是UIWebView问题仍然存在`

难道**微信用的还是UIWebView？？？要知道现在已经是iOS10的年代了啊！

...

还真是...

…...

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－

2017年1月5号来更新下...

微信发了个通知，说他们**终于**要把webview换成WKWebView了，让开发者赶快测试切换至WKWebView...

老大难问题可算解决了，加油WX...