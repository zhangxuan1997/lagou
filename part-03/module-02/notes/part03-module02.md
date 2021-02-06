### 笔记：

1.在模板中不要写过多无意义的空白和换行，否则，生成的AST对象会保留这些空白和换行，被存储到浏览器内容中。

#### 2.请简述Vue首次渲染的过程。

1. 进行Vue的初始化，即vue的实例成员和静态成员
2. 初始化结束后，调用vue的构造函数
3. 构造函数中，调用_init方法，即this.__init()，此方法相当于整个vue的入口
4. _init（）中调用$mount()；$mount()有两个，第一个$mount()在enter-runtime-with-compiler.js即入口文件中，此$mount（）的核心作用是把模板编译成render函数，它首先会判断是否传入了render(),如果没有传入，则去获取template选项，如果template也没有的话，会把el中的内容作为模板，然后把模板通过compileToFunctions()编译成render函数，render函数编译好后，render()会被存到options.render中；第二个$mount()在runtime/index.js中，在这个$mount()中，会重新获取el;
5. 接下来调用mountComponent(this,el),此方法位于lifecycle.js中，此方法会首先判断是否有render选项，如果没有但是传入了模板，并且当前是开发环境的话，会触发警告，这个判断的目的是，告诉我们运行时版本不支持编译器；然后会触发beforeMount这个生命周期中的钩子函数，即开始挂在之前，然后定义了updateComponent,在此函数中，调用了_render()和_update(),vm._render()的作用是生成虚拟DOM，vm._update()的作用是将虚拟DOM生成真实DOM且挂在到页面中；然后创建了watcher对象，在watcher对象中会调用updateComponent（），然后在watcher中会调用get（）；watcher对象创建完毕后，会触发生命周期中的钩子函数mounted();最终返回vue实例（即：vm）
6. 在watcher.get()中会执行的操作是：创建完watcher会调用一次get，get方法中会调用updateComponent()，updateComponent会调用vm._render()和vm._update();调用vm._render()创建VNode;updateComponent会调用vm._update()记录vm.$el

#### 3.请简述Vue响应式原理。

1. 从init()中开始，在init()中调用initState()-->initData()-->observe()
2. observe(value)：
   1. 位置：src/core/observer/index.js
   2. 功能：
      1. 判断value是否是对象，如果不是对象直接返回；
      2. 判断value对象是否有-ob-（前后都为双下划线）,如果有直接返回；
      3. 如果没有，创建observer对象
      4. 返回observer对象
3. observer:
   1. 位置：src/core/observer/index.js
   2. 功能：
      1. 给value对象定义不可枚举的-ob-（前后都为双下划线）属性，记录当前的observer对象；
      2. 数组的响应式处理（设置数组的特殊方法：push()等）
      3. 对象的响应式处理，调用walk方法
4. defineReactive:
   1. 位置：src/core/observer/index.js
   2. 功能：
      1. 为每一个属性创建dep对象
      2. 如果当前属性的值是对象，调用observe
      3. 定义getter
         1. 收集依赖
         2. 返回属性的值
      4. 定义setter:
         1. 保存新值
         2. 如果新值是对象，调用observe
         3. 派发更新（发送通知），调用dep.notify()
5. 收集依赖：
   1. 在watcher对象的get方法中调用pushTarget记录Dep.target属性
   2. 访问data中的成员的时候手机依赖，defineReactive的getter中收集依赖
   3. 把属性对应的watcher对象添加到dep的subs数组中
   4. 给childOb收集依赖，目的是子对象添加和删除成员时发送通知
6. watcher:
   1. dep.notify()在调用watcher对象的update()方法
   2. queueWatcher()判断watcher是否被处理，如果没有的话添加到queue队列中，并调用flushSchedulerQueue()
   3. flushSchedQueue():
      1. 触发beforeUpdate钩子函数
      2. 调用watcher.run()，run()-->get()-->getter()-->updateComponent
      3. 清空上一次的依赖
      4. 触发actived钩子函数
      5. 触发updated()钩子函数

#### 4.请简述虚拟DOM中key的作用和好处。

- ​	跟踪每个节点的身份，从而重用和重新排序现有元素
- 设置key后，dom操作会更少

#### 5.请简述Vue中模板编译的过程。

1. 模板编译的入口函数compileToFunctions(template,...)先从缓存中加载编译好的render函数，如果缓存中没有则调用compile(template,options)进行编译
2. 在compile(template,options)中，首先合并选项（options）,然后调用baseCompile(template,trim(),finalOptions)编译模板
3. 将模板和合并好的选项传递给baseCompile(template,trim(),finalOptions)
4. baseCompile()完成了模板编译核心的三件事情：
   - parse():把template转换成AST tree；
   - optimize():标记AST tree中的静态sub trees；检测到静态子树，设置为静态，不需要在每次重新渲染的时候重新生成节点；patch阶段跳过静态子树；
   - generate():AST tree 生成js的创建代码；
5. compile执行完毕后，回到编译的入口函数compileToFunctions;compileToFunctions中会继续把上一步中生成的字符串形式js代码转换成函数，render和staricRenderFns初始化完毕，挂在到Vue实例的options对应的属性中；