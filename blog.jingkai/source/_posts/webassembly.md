---
title: WebAssembly初试
date: 2017-01-10 23:27:06
tags: frontend webassembly
---

WebAssembly这个东西最近总是听人提起，有点意思，看样要搞一搞。

先看看这个东西是什么吧。

Google一发，第一个就是，<http://webassembly.org/>点进去看一下。

最上面一行很关键，`WebAssembly has reached the Browser Preview milestone`，说已经在Browser Preview阶段了，浏览器实现了现阶段的实验性功能，也就是说可以直接在Browser里面跑起来啦！

`Part of the open web platform`这段比较关键，说WebAssembly modules可以和JavaScript module互相访问，然后也具有和JavaScript一样访问浏览器核心功能的能力。

所以我的理解就是，WebAssembly就是通过工具把非JavaScript的语言（当然可能也可以是JavaScript）编译成wasm（姑且叫它web汇编）语言，然后在浏览器引擎（V8，SpiderMonkey）里实现对wasm的解释。也就是说，使用了WebAssembly的网站加载的可能不只是.js文件，还会有.wasm文件。而.wasm会和.js一样被浏览器加载执行。



好吧，什么也别说了，既然厉害，还是写点试试吧。

首先打开<chrome://flags>，搜webassembly，出现了一个**Experimental WebAssembly**，显然这就是打开wasm的开关了。还有一个asm.js也和wasm有关，先不管，一起打开吧。

然后看[Developer Guide](http://webassembly.org/getting-started/developers-guide/)，需要的工具（Mac）有CMake，Xcode和Python 2.7.x。

CMake如果没装过要装一会，Mac直接```brew install cmake```就好了。

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

然后编译！这里Guide告诉我们要加上一个参数```WASM=1```，不然的话默认会用asm.js编译。不知道为什么但是我信了：

```shell
$ emcc hello.c -s WASM=1 -o hello.html
```

编译完出现了几个文件hello.html，hello.wasm，hello.wast。

这里并不能直接在浏览器里打开hello.html，跟正常的html一样，从file://读取的html文件也会受同源策略的限制，所以还要开一个dev server，不过编译起很贴心自带一个这个server。

```shell
$ emrun --no_browser --port 8008 .
```

 然后打开浏览器访问<http://localhost:8008/hello.html>：

![](/images/run-wasm.png)