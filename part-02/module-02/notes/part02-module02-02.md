# 任务二：webpack打包

#### 1.常用命令：

- serve . : 在当前路径执行该命令，会运行该index文件

- yarn init --yes : 初始化package.json文件
- yarn add webpack webpack-cli --dev : 将webpack指定为开发依赖

#### 2.Webpack常用加载器分类

- 编译转换类
- 文件操作类
- 代码检查类

#### 3.Webpack加载资源的方式

- 遵循ES Modules标准的import声明

- 遵循CommonJS标准的require函数

- 遵循AMD标准的define函数和require函数

- *样式代码中的@import指令和url函数

- *HTML代码中图片标签的src属性

  注：进行资源加载时，只需统一使用import或require中的一种即可，无需混合使用，因为混合使用会降低项目的可维护性。

#### 4.loader是Webpack的核心

#### 5.Webpack中自动清除输出目录的插件

clean-webpack-plugin

#### 6.配置的插件放在plugin:{}中

#### 7.Webpack自动生成HTML的插件：html-webpack-plugin

#### 8.copy-webpack-plugin : 对某个文件夹中的内容进行复制

#### 9.压缩图片：imagemin-webpack-plugin

#### 10.Webpack开发一个插件：

- 插件需为一个函数或是一个包含apply方法的对象