## 作业：

### part2--模块二：模块化开发与规范化标准

#### 一：简答题 

##### 1.Webpack的构建流程主要有哪些环节 ？如果可以请尽可能详尽的描述webpack打包的整个过程。

过程：

- webpack首先会找到项目的入口文件，在入口文件中引入下载的插件；
- 在output中给path赋值来定义编译后的文件导出目录；
- 配合gulp.task()方法来对html、sass、js等不同类型的文件进行编译，在此方法中找到不同类型文件所在目录，然后在pipe()中执行压缩或编译的操作，将获得结果存放到自己定义的文件夹中；

##### 2.Loader和Plugin有哪些不同 ？请描述一下开发Loader和plugin的思路。

Loader:

- 使用loader可以处理一些非js文件，将js中引入的图片、样式文件等文件以正确的方式插入到html或样式文件中。

- 使用babel-loader可以将es5以上的语法打包后转为es5语法。但es5以上的api(promise、async)需要通过babel-polyfill进行处理。

Plugin:

- plugin可以对代码进行优化、传输文件、清除文件等。

- tree-shaking用到的是uglifyjs-plugin、purify-css对代码进行压缩，对无用的代码进行清除。但在webpack4中，production模式自带此功能。