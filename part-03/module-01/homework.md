### 一.简答题

#### 1.当我们点击按钮的时候动态给data增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，他的内部原理是什么。

```vue
let vm = new Vue({
	el:'#el',
	data:{
		o:'object',
		dog:{}
	},
	method:{
		clickHandler(){
			//该 name 属性是否是响应式的
			this.dog.name = 'Trump'; //
		}
	}
});
```

答：//老师好，可以先帮我把课程解锁吗，作业会后续再提交 



#### 2.请简述Diff算法的执行过程。

### 二.编程题

#### 1.模拟VueRouter的hash模式的实现，实现思路和History模式类似，把URL中的#后面的内容作为路由的地址，可以通过hashchange事件监听路由地址的变化。

#### 2.在模拟Vue.js响应式源码的基础上实现v-html指令，以及v-on指令。

#### 3.参考Snabbdom提供的电影列表的示例，利用Snabbdom实现类似的效果，如图：