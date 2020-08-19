## 笔记/任务一：模块化开发

#### 1.早期模块化的使用方式：

- 按文件名称划分：将不同功能及相关的状态数据存放到不同的文件中，这时每个文件便是每个模块；此种方法可以被外部访问和修改

- 命名空间方式：将模块成员封装起来，只暴漏一个全局对象，所有模块都挂载到全局对象中;此种方法可以被外部访问和修改

- IIFE(立即执行函数)：只能在内部被访问，确保了私有变量的安全

![image-20200712092011283](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200712092011283.png)

一个需要依赖jQuery的立即执行函数：

![image-20200712092222800](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200712092222800.png)

以上方式是使用直接引用相关模块的js文件的方式配合使用，

#### 2.CommonJS规范：对模块化做出规范；以同步模式加载模块 

内容：

- 一个文件就是一个模块
- 每个模块都有单独的作用域
- 通过module.exports导出成员
- 通过require函数载入模块

#### 3.nodeJS执行机制是在启动时加载模块，执行过程中不需要加载模块，只是使用模块

#### 4.ES Modules的使用

通过给script标签添加type =“module”的属性，就可以以ESModule的标准执行其中的js代码

![image-20200712100308388](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200712100308388.png)

#### 5.ES Modules基本特性

- ESM自动采用严格模式，忽略“use strict”

- 每个ES Module都是独立运行在私有作用域中

- ES Module中，外部js文件是通过CORS的方式请求，即js模块不在同源地址时，那么请求的js地址需要提供有效的CORS标头

  

  ![image-20200720221350705](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720221350705.png)

- ES Module的script标签会延迟执行脚本

![image-20200720221704639](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720221704639.png)

​	在type="module"的script标签中引入js文件，即意味着该文件会在元素加载完之后执行，该效果等同于defer:<script defer></script>

#### 6.ES Module的导入和导出

导出：export在模块内使用，用于对外暴漏接口；import在模块内导入其他模块所提供的接口

#### 7.ES Module 的import使用时需注意

- 引入的module需为完整的名称 例：“./module.js”

- 相对路径中的./不能省略，否则浏览器会认为是在加载第三方插件

- 引入的模块路径可以使用绝对路径或完整的url

- 当只需执行某个模块，并不需要提取模块中某个成员时，可以使用：{}为空的方式，例：import {} from ‘module.js’ 可简写为：import './module.js'

- 当需要导出多个成员时，可以使用*将其全部导出，然后使用as将其重命名为一个对象，使用调取对象中属性的方式调取每个成员；例：import * as mod from 'module.js'; mod.moduleOne

- import引入模块只能位于文件的最顶层，不能放在代码内层中，那么，如何动态加载模块：

  ![image-20200720225058506](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720225058506.png)

  ![image-20200720225109136](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720225109136.png)

- 在模块中，若同时导出了命名成员和默认成员，

  方法一：

  ![image-20200720225229397](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720225229397.png)

  方法二：使用逗号，都好左边为默认成员，将其重命名为abc,逗号右侧为原本便拥有名称的成员

  ​	![image-20200720225328586](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720225328586.png)

#### 8.ES Module  in Browser  -- polyfill兼容方案

原因：es module 不被早期浏览器所兼容

#### 9.es-module-loader

在使用了es module的文件中引用es-module-loader.js文件，即可让网页能够运行es module

地址及用法：https://github.com/Moduleloader/browser-es-module-loader;

不通过npm命令安装es-module-loader的话，如何获得该文件：

通过unpkg.com中获得，具体地址为：https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js

![image-20200720230907736](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720230907736.png)

注意：以上文件中使用了promise，浏览器可能报错：‘promise未定义’,所以需要为IE引入promise-polyfill，即最终结果为：

![image-20200720231209753](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720231209753.png)

如何解决脚本执行两次的问题：

![ ](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200720231442863.png)

注意：生产阶段应该使用安装模块，编译模块的方式将代码编译出来，以提高代码运行效率

#### 10.ES Module 与COmmonJS 

- ES Module中可以导入CommonJS模块
- CommonJS中不能导入ES Module模块
- CommonJS始终只会导出一个默认成员
- 注意import不是解构导出对象

#### 11.babel

是什么：JavaScript编译器

#### 12.AMD规范和CMD规范

![image-20200721000031010](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200721000031010.png)

![image-20200721000113608](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200721000113608.png)