### 笔记：

#### 1.vue.js的声明周期：

(1) 创建Vue实例

(2) 初始化事件和声明周期

(3) 初始化声明周期中的beforeCreate()函数

(4) 初始化注入和校验的操作，会把props,data,methods等成员注入到实例上

(5) 触发created()构造函数，执行到此步骤时已经初始化了props，data,methods等成员，所以在此步骤可以访问到这写成员；

(6) 将模板编译成render()函数，（此函数中参数为h--vue源码这样写的）首先判断选项中是否设置了el选项，，如果没有设置则调用vm.$mount(el)函数对，vm.$mount(el)作用是将el转换为template

(7) 将template转换成render()

(8) 判断是否设置了template，如果没有设置则将el外部的HTML作为template编译 (已设置之后的步骤在第七条)

(9) 然后准备挂载dom,首先会触发beforeMount()此钩子函数，即挂载之前所执行的函数，在此函数中无法获取新元素的内容

(10) 然后准备挂载dom ,把新的结构渲染到页面中，然后触发mounted()，在此钩子函数中可以访问到新的dom结构中的内容

(11) 挂载完毕后，再修改data()成员时，首先会触发beforeUpdate(),然后进行新旧两个虚拟dom的对比，然后把差异重新渲染到浏览器中，最后触发updated(),再beforeUpdate()中，如果直接访问浏览器中的渲染内容，则访问到的还是上一次的结果，我们想要的内容应该再update()中访问；

(12) 销毁阶段：当我们调用vm.$beforeDestroy()时，首先将会访问beforeDestroy()，然后执行清理工作，最后触发destroyed(),至此销毁完毕；

#### 2.Vue.js语法和概念

- 差值表达式
- 指令
- 计算属性和侦听器
- class和style绑定
- 条件渲染/列表渲染
  - 条件渲染：通过控制v-if和v-show控制元素的显示和隐藏；v-if:当条件为false时，不会输出相应的元素;v-show:元素会渲染到页面，然后通过样式控制其隐藏显示；
  - 列表渲染：v-for; key的作用：跟踪每一个节点的身份，让每一项都能最大程度的被重用，从而提高性能

- ​	表单输入绑定：v-module监听用户的输入事件以及即时更新数据，即双向数据绑定
- 组件（概念）
- 插槽（概念）：我们在自定义组件中即相当与挖了一个坑，当我们使用此组件时便是在填坑；可以使组件更灵活，例：VueRouter中的router-link组件，此组件中的文本是在外部使用时被传递进来，内部使用插槽占位；
- 插件（概念）：例：VueRouter,vuex
- 混入  mixin
- 深入响应式原理

#### 3.v-if和v-show的区别

v-if:当条件为false时，不会输出相应的元素;v-show:元素会渲染到页面，然后通过样式控制其隐藏显示；

#### 4.VueRouter使用步骤

1. 在views文件夹中创建跟路由相关的组件；例：Blog.vue，index.vue
2. 找到路由模块，在router文件夹中的index.js，Vue.ues()作用是注册组件