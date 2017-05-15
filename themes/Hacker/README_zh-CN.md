# Hacker | [English README](/README.md)

__Hacker是一款专注于写作的简洁博客主题。在如此讲究复杂排版的趋势下，选择回归本源，专注于写作这件事。__  

一开始是[moyo](http://liuxinyu.me/)为Wordpress所创作的一个主题，  
由DaraW移植到Hexo。

## Demo
参考我的博客：[DaraW](http://blog.daraw.cn/)  

![](https://ooo.0o0.ooo/2016/08/04/57a306f56bee2.png
)

## 安装
获得主题文件， `git clone`或者`download zip`均可；  

在`themes`文件夹中创建文件夹`Hacker`，将主题文件都复制粘贴至`Hacker`文件夹；  

然后在hexo全局配置文件`_config.yml`中应用主题：

```yaml
theme: Hacker
```
这样就安装好了，开始享受吧~

__注意：版本更新后建议在hexo生成前执行一次`hexo clean`，清除以前的缓存，避免带来的一些莫名其妙的问题。__

## 配置
在主题配置文件`_config.yml`中：

```yaml
# duoshuo comment
duoshuo: true
duoshuo_name:

# disqus comment
disqus: false
disqus_shortname:

# google analytics
googleTrackId:
```


`duoshuo`: `boolean`，是否开启多说评论；  
`duoshuo_name`: `string`，你的多说用户ID，请不要使用别人的ID。  

`disqus`: `boolean`，是否开启disqus评论；  
`disqus_shortname`: `string`，你的disqus site shortname。  

`googleTrackId`: `string`，为谷歌分析的个人ID，留空则为不使用谷歌分析。

## 更新
### v0.3
* 重构ejs模板
* 改用stylus
* 添加英文文档


### v0.2
* 去除部分无用css和重复css
* 修复无分类/标签依然出现icon的bug
* 重写归档列表页面
* 修改代码块样式


## 协议
GPL(General Public License)
