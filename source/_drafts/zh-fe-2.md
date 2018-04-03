---
title: 小创业公司前端修仙之路（二）
tags:
  - frontend
---

克服拖延症，继续修仙...

<!-- more -->

# 元婴期

> React 之始



之前 AngularJS 技术栈道开发有一个让人无法忍受的地方是：组件化比较差。由于用的是 AngularJS 1.4.x 版本，本身就不支持组件，只能凑合着写点 directive。但是 directive 这个东西，用过的人都知道，没有生命周期方法，很是难受。

在这种情况下，更换一个能够友好支持组件化开发的框架势在必行。

## 试水

这时候有个内部运营系统的需要开发，由于是内部系统，技术选型比较随意，所以没多想就上了 React + Redux + ImmutableJS。

经过了一段时间的开发，运营系统上线了。开发运营系统的过程的一些感受：

* 组件化开发模式很顺手

* 用 Redux 来管理应用状态十分有序

* 积累一套基础组件库很有必要（这时候用的还是 [material-ui](http://www.material-ui.com/)，事实证明坑爹）

* React 处理表单有点恶心

* 不要把所有状态都放到 Redux 中

## 重构

商家端产品在经历的一次重新设计之后，功能、页面的组织、权限管理上和之前有了极大的区别。
这时候摆在面前有两个选择，继续在 AngularJS 基础上修修补补或是干脆重写。

评估后发现，即便是坚持 AngularJS ，实现新版本也需要把原来的大部分代码翻工一遍，而且由于之前没有组件化开发，翻工意味着几乎所有代码都需要被修改。干脆一不做而不休，直接换框架重写。

有一点要说的是，也就是因为当时商家端的业务没有很复杂，这才能说重写就重写。

而框架的选型，最终是：React + React-Router + Redux + Redux-Saga + ImmutableJS，原因大体如下：

* 商家端未来考虑开发原生移动端应用，希望能顾通过使用 React-Native 来获得代码重用
* 状态管理是必要的，Redux 是当时的主流
* 相对于 normalize 数据，用 ImmutableJS 处理深层对象更直接，但是同时会带来额外学习成本
* 与 Thunk 相比，Redux-Saga 功能更加强大，同时基于 generator 的同步的写法比较直观且方便测试



同时，基于这套技术栈，有一些简单的约定：

* redux 的状态（reducer）根据 domain data 来组织，原因是：
  * 参考了[Redux BasicReducerStructure](https://github.com/reactjs/redux/blob/master/docs/recipes/reducers/BasicReducerStructure.md)
  * 基于 domain data组织将会更加灵活，希望 Redux 的代码能在未来的 React-Native 中得到重用
* 根绝是否连接到 redux store 区分 Presentational Component 和 Container Component，希望 Presentational Component 更加灵活，而 Container Component 使用更加方便
* 把通过 http 请求获取的数据放到 redux store 中
* reducer 的 state 是一个纯粹 ImmutableJS 对象





