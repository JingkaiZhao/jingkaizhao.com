---
title: WebAssembly初试
date: 2017-01-10 23:27:06
tags:
- frontend
- webassembly
thumbnail: /images/wasm.png
---

WebAssembly这个东西最近总是听人提起，有点意思，看样要搞一搞。

<!-- more -->

先看看这个东西是什么吧。

Google一发，第一个就是，<http://webassembly.org/>点进去看一下。

最上面一行很关键，`WebAssembly has reached the Browser Preview milestone`，说已经在Browser Preview阶段了，浏览器实现了现阶段的实验性功能，也就是说可以直接在Browser里面跑起来啦！

`Part of the open web platform`这段比较关键，说WebAssembly modules可以和JavaScript module互相访问，然后也具有和JavaScript一样访问浏览器核心功能的能力。

所以我的理解就是，WebAssembly就是通过工具把非JavaScript的语言（当然可能也可以是JavaScript）编译成wasm（姑且叫它web汇编）语言，然后在浏览器引擎（V8，SpiderMonkey）里实现对wasm的解释。也就是说，使用了WebAssembly的网站加载的可能不只是.js文件，还会有.wasm文件。而.wasm会和.js一样被浏览器加载执行。



好吧，什么也别说了，既然厉害，还是写点试试吧。

首先打开<chrome://flags>，搜webassembly，出现了一个**Experimental WebAssembly**，显然这就是打开wasm的开关了。还有一个asm.js也和wasm有关，先不管，一起打开吧。

然后看[Developer Guide](http://webassembly.org/getting-started/developers-guide/)，需要的工具（Mac）有CMake，Xcode和Python 2.7.x。

CMake如果没装过要装一会，Mac直接`brew install cmake`就好了。

有virtualenv的化用virtualenv创建一个新的env

```shell
$ virtualenv wasm && source wasm/bin/activate
```

然后要clone一个[Emscripten](https://github.com/juj/emsdk.git), 看起来这个应该是编译C到wasm的编译器了。

再到emsdk项目里面跑这个编译编译器。（＝ ＝＃

```shell
$ ./emsdk install sdk-incoming-64bit binaryen-master-64bit
```

这个地方就尴尬了，这个要下载很多东西…有大几百M，开着Astrill下了很久很久...

![](/images/wasm-install.png)

下载完了之后编译源码也要花很长时间，而且这个时候有几个clang进程全速跑着，CPU占用是这样事儿的：

![](/images/cpu-build.png)

总之整个过程大概持续了1个半小时吧...没时间的时候不要轻易尝试安装这个东西！

接着

```shel
$ ./emsdk activate sdk-incoming-64bit binaryen-master-64bit
$ source ./emsdk_env.sh
```

编译器就能用了。

接下来建一个project然后就可以写wasm了（感觉很激动）：

```shell
$ mkdir wasm-hello && cd wasm-hello
$ vi hello.c
```

写一段标准C程序进去（快不会写了）：

```c
#include <stdio.h>

int main(int argc, char **argv) {
  printf('Finally meet you, wasm.\n');
}
```

然后编译！这里Guide告诉我们要加上一个参数`WASM=1`，不然的话默认会用asm.js编译。不知道为什么但是我信了：

```shell
$ emcc hello.c -s WASM=1 -o hello.html
```

编译完出现了几个文件hello.html，hello.wasm，hello.wast。

这里并不能直接在浏览器里打开hello.html，跟正常的html一样，从file://读取的html文件也会受同源策略的限制，所以还要开一个dev server，不过编译器很贴心自带一个这么一个server。

```shell
$ emrun --no_browser --port 8008 .
```

 然后打开浏览器访问<http://localhost:8008/hello.html>：

![](/images/run-wasm.png)

有错，看起来编译器编译的wasm版本和浏览器运行环境不一致。不管错误，打开Network看一下，果然加载的是hello.html和hello.wasm文件，验证了之前的猜想。

到[Emscripten](http://kripken.github.io/emscripten-site/)网站看一下，没招到具体解决版本问题的办法。去掉WASM=1再重新编译一遍，发现这次没有生成.wasm和.wast文件，只有.js和.html。所以asm.js编译应该是把.c编译成了js文件。再重新运行服务器，浏览器里打开html。Console里成功出现了

```shell
Finally meet you, wasm.
```

其实这种编译方法应该算不得是纯wasm了，毕竟生成了现代浏览器可以运行的js文件，有种polyfill的感觉。时间有限就先这样了吧。Mark下，[asm.js](asmjs.org)这个也需要研究下…（扶额。



最后说点感想，WebAssembly可能会给前端带来的变化。

首先，这种开发模式是不是有种“似曾相识”的感觉？其实现在前端开发也是这么一种状态：**本地运行一个跑着babel的dev server，把ES2015/ES201＊编译成兼容良好的ES5（当然还可能会有其他编译，SASS/LESS/TS等等），浏览器里运行着的代码其实并不是你最初在编辑器里写的那些代码，然后借助sourceMap，可以在浏览器里获得还不错的debug体验**。WebAssembly可能也会是这么一种开发体验——浏览器里运行着的wasm始终是需要从某种语言编译过来的。鉴于现在大家对babel的接受程度，估计大家对WebAssembly这种开发模式的接受程度可能会不错。



然后，第二个比较大的影响可能会是NodeJS。我看的到的NodeJS服务端的一个很大的优势是能够前后端统一语言环境，能够同构直出。当WebAssembly来了之后，这个优势将被大大削弱。以后可能会出现前后端都是Python、前后端都是C++的技术栈，很多Python库C++库将能够编译后在浏览器内运行…（以后会不会有“招聘高级Python前端工程师”呢？）



再扯远点，现在JavaScript社区的优势就在于，babel广泛普及的情况下，开发者会积极地使用新的语言规范，从而使得社区能给规范制定者足够多的反馈，然后进一步对语言进行完善。那会不会WebAssembly之后，JavaScript社区能把这种模式带给其他社区，促使其他语言各种新功能不断被编译成wasm放到生产环境中验证。然后实现共同富裕～（误



当然，WebAssembly离production还是有很长的距离的，看看现在ES2015的兼容列表就知道这将是怎样的一个过程...不过这东西确实不错，应当滋瓷一些！



至于WebAssembly来了JavaScript会死吗这种问题，相信可以参考“ES2015来了《JavaScript高级程序设计》这种书还需要看吗”这种问题的答案...
