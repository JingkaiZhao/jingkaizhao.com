---
title: Chrome下最小字体12px
tags:
  - frontend
  - css
date: 2017-05-30 21:14:30
---


前端开发老司机都知道在Chrome下面有个蛋疼的问题：字体大小不能小于12px。但是尴尬的问题在于，有时候设计师就是要求你用10px、8px的字，你能怎么办？

<!-- more -->

在以前（版本20+的时候？），可以用属性`-webkit-text-size-adjust: none;`来取消Chrome最小字体12px的限制，但是后来Chrome禁用了这个webkit属性。原因大概是滥用`-webkit-text-size-adjust`会导致Chrome本身的放大缩小功能失效，Chrome将不再能控制页面的整体字体缩放。（摊手



所以这个时候如果设计师再需要你写一个8px的字怎么办呢？

其实有很多种方法实现这件事，我尝试了两种实现思路：svg和`transform: scale()`。



## svg

首先实现的思路是实现一个支持小号字体的组件，然后在组件中封装一个svg（text标签可以支持小鱼12px的字体）。以`React`组件写法为例：

``` jsx
import React from 'react';

const SvgText = ({
    children, 
    className,
    style = {},
}) => {
    const {
        width,
        height,
        fontFamily,
        fontSize,
        color,
        ...rest,
    } = style;
    return (
        <svg width={width} height={height} className={className} style={rest}>
            <rect 
              fill="transparent" 
              x="0" 
              y="0" 
              width={width} 
              height={height}
            />
            <text 
                x={width / 2} 
                y={height / 2} 
                fill={color}
                fontFamily={fontFamily} 
                fontSize={fontSize} 
                height={height}
                textAnchor="middle" 
                alignmentBaseline="central"
            >
                {children}
            </text>
        </svg>
    );
}

export default SvgText;
```



首先声明一块`svg`，然后在里面画一个宽高确定的`rect`，再在里面画一个`text`，`text`标签的内容就是真正想显示文本的内容。

当然这只是个简单的版本，熟悉svg的应该看得出来这里是把text内容的位置在rect中居中了。如果需要`text-align: left`或者`text-align: right`的版本可以传一个prop进来，再根据它计算`x`，`y`，`textAnchor`，`alignmentBaseline`。

这个写法可以实现功能，但是出现的问题是没有办法通过正常CSS属性去操作这个组件，如果仅仅是左对齐、右对齐、居中还好，如果有更复杂的布局就会很蛋疼。



## transform

其实首先想到的是这个方案，scale这个属性的作用正好是进行放大缩小，但是所带来的问题是，放大缩小只是视觉上的缩放，实际所占位置（width、height）并没有变。所以这个组件的思路就是实用一个固定字体大小，在此基础上进行scale，然后动态设置width、height把宽高改回scale之前的样子。

``` jsx
import React from 'react';

const BASE_SIZE = 12;

const FullSizeText = ({
    children,
    fontSize,
    style,
    ...rest,
}) => {
    const ratio = fontSize / BASE_SIZE;
    let width = (1 / ratio) * 100;
    let fontStyle = {
        fontSize: BASE_SIZE,
        transform: `scale(${ratio})`,
        width: `${width}%`,
    }
    return (
        <div style={{
            ...style,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: style.fontSize,
        }} {...rest}>
            <span style={fontStyle}>{children}</span>
        </div>
    );
}

export default FullSizeText;
```



依然是个简单的版本，实现了`text-align: center`的功能。

这种实现方法中，使用`flexbox`可以简单地实现出左右对齐、居中的效果，表现行为比较像HTML，由于使用了两层`div`嵌套，所以对组件的样式可以apply到外层`div`上（padding、margin、positioning等），用起来比SvgText方便一些。

最终选择了这种实现方式满足设计师的癖好（划掉）**需求**。