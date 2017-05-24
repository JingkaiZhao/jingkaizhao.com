---
title: position fixed真的是相对viewport定位吗？
date: 2016-12-28 22:01:36
tags: 
- frontend
- css
---

几天前遇到个很尴尬的问题，有关`position: fixed`。问题是这样的：

<!-- more -->

写了个带overlay的Dialog，代码大概长这样的：

```jsx
<div style={{
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: 'rgba(0,0,0,.3)',
}}>
  <body>
    {...}
  </body>
</div>
```

然后用的时候在大概是这样用的：

```jsx
<div className="contaienr">
  {/* ... */}
  <div className="card">
    <Dialog {...dialogProps} />
  </div>
  {/* ... */}
</div>
```

期望出现的情况是dialog的overlay覆盖整个viewport，然后dialog在overlay（浏览器窗口）中居中。

但是在真正使用dialog的时候发现不行，有的时候不知道为什么dialog的overlay会怪异地覆盖某个dialog的祖先容器。貌似`position: fixed`没有起到它“应有”的作用，反而是根据这个容器定位了。

很奇怪，找了半天原因，发现这些出问题的容器有一个共同点，就是全都设置过`transform`属性。难道说...

打开MDN，搜索position: fixed后，发现MDN上是这么说的：（<https://developer.mozilla.org/en/docs/Web/CSS/position>)

```
Do not leave space for the element. Instead, position it at a specified
position relative to the screen's viewport and don't move it when
scrolled. When printing, position it at that fixed position on every
page. This value always create a new stacking context. When an ancestor
has the transform property set to something different than none then
this ancestor is used as container instead of the viewport (see CSS
Transforms Spec).
```

前面一半说得确实是正常了解的事实：fixed会相对于viewport进行定位，并且使其位置不随滚动发生变化。但是后半部分就逗了：**当某一个祖先（ancestor）设置了transform属性并且不是none的时候，那么就相对于这个元素进行定位（而非viewport）**。



好吧，果然是transform的锅，那么这到底是为什么呢？

点开[CSS Transforms Spec](https://www.w3.org/TR/css-transforms-1/#propdef-transform)，里面有一句Any computed value other than [none](https://www.w3.org/TR/css-transforms-1/#none) for the transform **results in the creation of both a stacking context and a containing block**. The object **acts as a containing block for fixed positioned descendants**. 

所以当给一个元素设置transform属性时，除了会创建一个stacking context（3d层级的上下文？）外，还会创建一个containing block（用于定位），这个containing block将表现为其所有fixed position后代的containing block（这里要补充一句，position的定位都是根据containing block来进行定位的）。

原因到此处已经明了了——**规范规定即是如此**。

但是问题怎么解决呢？参照了一下其他库的实现，发现没有好的hack的方法，只能每次在dialog加载的时候把它作为body的直接后代插到DOM里面。对应到React上的话可以这样写：

```jsx
// 实现一个RenderToLayer，把特定的render方法在body下render
class RenderToLayer extends Component {
  componentWillMount() {
    // component mount前执行renderLayer
    this.renderLayer();
  }
  
  componentWillUmount() {
    // unmount时删除render的节点(没列出)
    this.unrenderLayer();
  }
  
  renderLayer() {
    // 把props传进来的某个render方法渲染到body上
    const {render} = this.props;
    this.layer = document.createElement('div');
    document.body.appendChild(this.layer);
    const layerElement = render();
    // 把render方法产生的vd render到layer中
    this.layerElement = unstable_renderSubtreeIntoContainer(
       this, layerElement, this.layer);
  }
  
  render() {
    // render什么事都不干
    return null;
  }
}

// Dialog的实现改成这样
class Dialog extends Component {
  renderContent() {
    // 真正的render方法，会被RenderToLayer执行
    return (
      <div className="dialog">
        {/* ... */}
      </div>
    )
  }
  render() {
    // render方法里面只有RenderToLayer，其实什么都没产生 
    // (RenderToLayer的render方法return了个null)
    return (
      <RenderToLayer
        render={this.renderContent}
      >
      </RenderToLayer>
    );
  }
}
```



OK，最后虽然解决了issue，但是始终有个疑问挥之不去：

**在制定CSS规范时为什么要定这种规则？**

在这种规则下`position:fixed`的表现会不稳定，你永远不知道你的父元素中哪一层会有transform属性，那么fixed根据viewport定位也就没有那么可靠了。

难道说是因为浏览器实现transform时，如果不是这种规则的话实现起来就会极为困难？

没有找到相关资料，找到后回来填坑...