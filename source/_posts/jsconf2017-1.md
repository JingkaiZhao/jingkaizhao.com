---
title: JSConf 2017（上）
tags:
  - frontend
date: 2017-07-15 22:38:51
---



JSConf2017 第一天记（tu）录（cao）。

<!-- more -->



## Programming the Universal Future with Next.js

Next入门教程，不细说了，官方文档有。
现场敲代码demo，好评！VIM党，好评！tmux，666！
推一波Next.js 3.0（这个广告我接受！有空试下）



## 理解现代Web开发

**dexteryy（杨杨）**，《现代Web开发者的魔法书》作者。
紧张得有点结巴...埋头狂读PPT。

觉得有意义的只有开头和结尾两部分：

开头吐槽了国内JS社区（也不止JS社区）与世隔绝，和国外社区交流很少，自己跟自己玩。这个确实存在，国内的开源项目很多都是中文文档、中文讨论issue，国外开发者参与不进来；国外的开源项目因为有“语言壁垒”，国内的开发者也不愿意去参与。

结尾5分钟讲了自己在公司的一些实践经验，算是干货。

其他时间没有get到point（或者本来就没有point）。



## 后ES6时代JavaScript语言

**Hax**

先用compatibility table介绍了下ES6的现状。值得一提的一点是，ES6有一个大部分（除Safari外）浏览器至今没有实现的功能，叫PTC（Program Trailing Call）。因为委员会大佬在纠结（有分歧）是STC（Syntax Trailing Call）还是PTC。这个之前不知道，有空了解下。

然后介绍了一堆ES7+的语言特性，之前都接触过，不说了。
后面说了下TC39制定标准的流程，stage 0 ~ stage 4啥意思之类的。
最后展望了下已经进入到stage-0阶段的新feature，比如matches（有意思，语法奇葩让人有点懵逼）。

留下一个有用的网站：[prop-tc39.now.sh](http://prop-tc39.now.sh)。



## 前端工程中的编译时优化

**Evan You**

前面分成两部分介绍常见（或者说已经正在被运用的）一些编译时优化的手段。（AOT vs JIT，这里编译时优化指AOT）

第一部分是**减小文件体积**，也就是压缩代码。这部分比较常见，略过...(提到了一个没用过的，butternut，有空看下)

第二部分是**加快运行速度**，这部分可以做的文章太多了。举了几个例子，比如babel-react-optimize和prepack运用的一些优化方法，Svelte的对DOM操作的优化等。（Sevelte这个库没见过，看一下）。

后面是介绍Vue运用了哪些编译时优化手段。比如对模版中的static node的提取处理、模版中引用的静态CSS class特殊处理、标记无法继续被flatten的children数组、SSR尽量字符串化等等。

这个是之前看标题就比较期待的，干货很多，特别是在Vue中的实践，最近在Vue的代码中或多或少能找到一些影子。



## 学习React-Native的历程，blablabla

**Neo Nie**

睡着了，感觉大哥前端开发经验有限。



## TypeScript，Angular，和移动端的跨平台开发

**Ryan Chen** Google ChromeCast Engineer Manager，英语很棒

**Everyone loves TypeScript.**

作为唯一一个提到TS的，加分。实际在介绍TS的时候只是一笔带过，不过对于TS的优势介绍最近深有同感，静态类型检查确实很有帮助！

介绍Angular4的部分只能说是走马观花，其实听完之后你会感觉除了知道了一些**Angular4里面有哪些东西**，其他并没有记得什么。

安利NativeScript这一段还不错，现场敲代码Demo，有空研究下。



## 如何利用Ruff OS物联网操作系统快速开发硬件产品

**郑晔**

这个也是之前比较期待的，因为前段时间差点买了Ruff的开发板（捂脸）。

实际也有现场Demo，Demo了用Ruff开发版写出”按下按钮LED亮，松开按钮LED灭“的简单程序。后面是一堆Ruff这个公司要干什么的可有可无的介绍。

这个还不错（可能是给Ruff加了分），到底要不要买个板子回来玩玩呢，天赋点不够了啊...

## Lighting Talk

### 非官方吐槽

尬聊，不够去年犀利，很多想吐的都没吐！

### 前端.AI

自动化把设计稿转换成代码，不错不错，加油啊！！！

### 掘金翻译计划

支持



---

没了，第一天整体上算是失望，等个明天。

