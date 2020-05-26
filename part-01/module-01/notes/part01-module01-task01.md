# 任务一：ECMAScript 新特性



1.async , await是ES2017中制定的标准。



2.ES6在ES5.1基础上的变化：

- 解决原有语法上的一些问题或不足（例：let,const提供的块级作用域）
- 对原有语法进行增强（解构、展开、参数默认值、模板字符串等）
- 全新的对象、全新的方法、全新的功能（promise、async）
- 全新的数据类型和数据结构（symbol、set、map）
  

3.工具：Nodemon--作用：修改代码后自动执行代码；命令：nodemon



4.字符串的扩展方法：

- includes()

- startsWith()

- endsWith()

  作用：用来判断字符串中是否包含某些内容；startsWith():判断字符串是否以某些字符开头；
  例：

  ```javascript
  const str = 'Error: foo is not defined.'; 
  console.log(str.startWith('Error')); //结果为true
  ```

  endsWith():判断字符串是否以某些字符结尾;
  例：

  ```javascript
  console.log(str.endsWith('.')); //结果为true
  ```

  includes():字符串中间是否包含某些内容；
  例：

  ```javascript
  console.log(str.includes('foo')); //结果为true
  ```

  

5. ...操作符用法：（1）收起剩余数据；（2）展开数组--spread; 用途：数组参数展开；

问：如何将一个数组内的参数按照次序传递？（例：传递数组arr=['apple','orange','banana']中的值，而不是传递这个数组）
   
   方法一：apply(); 具体使用：console.log(console,arr); // 由console调用，所以第一个参数为console
   
   方法二：...操作符；具体使用：console.log(...arr); //无论数组中的内容如何变化，都会被完整传递

6.箭头函数与普通函数之间的重要区别：箭头函数中没有this机制，即箭头函数不会改变this指向

7.计算属性名
用法：将属性名用方括号包裹，例：[Math.random()]:123;在方括号中可以使用任意表达式，表达式的结果将会作为属性名

8.对象扩展方法：object.is()：判断两个值是否相等
如何使用：

```javascript
Object.is(NaN,NaN); //true ; 在is()中放入将要进行比较的两个值
```

9.Proxy:代理

10.Object.defineProperty只能监视属性的读写；Proxy能够监视到更多对象操作

例：delete操作或对对象方法的调用；Proxy是以非侵入的方式监管对象的读写

11.Promise:一种更优的异步编程解决方案，通过链式调用的方式解决了传统异步编程中回调函数嵌套过深的问题

12.静态方法：static; 

例：在类中添加一个静态方法create（）


```javascript
class Person{
	constructor(name){
		this.name = name;
}
    
say(){
	console.log(`hi,my name is ${this.name}`);
}

static create(name){
	return new Person(name);
}
    
//静态方法是挂载到类型上，所以静态方法(即create())内部this不会指向实例对象，而是当前的类型
const tom = Person.create('tom');
tom.say(); // hi,my name is tom
```
13.类的继承
继承时须在constructor()中使用super(),super()始终指向父类，调用它即为调用父类的构造函数

14.Set数据结构：可将其理解为集合，其内部成员不允许重复
set数据结构常见的应用场景--为数组中的元素去重
例：const arr = [1,2,3,4,3,2,5,]; const result = new Set(arr); console.log(result); // Set {1,2,3,4,5}
去重后的数据非数组结构如何将其变为数组类型
方法一：使用Array.from()将其类型变为数组：

```javascript
const arr = [1,2,3,4,3,2,5]; 
const result  = Array.from(new Set(arr)); 
console.log(result); // [1,2,3,4,5]
```

方法二：...

```javascript
const arr = [1,2,3,4,3,2,5]; 
const result = [...new Set(arr)]; 
console.log(result); // [1,2,3,4,5]
```

15.has()--判断集合中是否有某个内容,delete()--删除某个内容,add()--添加内容,clear()--清除全部内容
实例化一个类后，使用has()方法判断是否含有某个值，使用delete()方法删除某个值
例：

```javascript
const s = new Set(); 
s.add(1).add(2).add(3).add(4).add(2);
console.log(s); // [1,2,3,4] add()时，重复的值将忽略，原因：Set其内部成员不允许重复；
//判断s中是否含有100：
s.has(100); // false
```

16.Symbol 作用 ： 表示一个独一无二的值

17.Object.keys()方法只能够获取到对象中的字符串属性名
object.getOwnPropertySymbols()获取到的是对象中的symbol类型属性名

18.for...循环适合遍历普通数组；for...in...适合遍历数值对；
for...of...（可以遍历任意类型）是一种数据统一遍历方式
for of 举例：

```javascript
const arr = [100,200,300];
for(const item of arr){
	console.log(item);
	if(item > 100) break; //可以使用break随时终止循环；forEach()无法终止遍历(使用：arr.forEach())
}
```

19.可迭代接口（本节内容也阐明了for..of循环的工作原理）：iterable接口 
什么是接口:一种规格标准
可迭代接口是可使用for...of的前提（实现iterable接口是for...of的前提）

20.迭代器核心：对外提供统一遍历接口

21.定义一个生成器函数：

```javascript
function * foo(){ 
    consoel.log('11'); 
    yield 100; //关键词yield 返回100，但并不会结束进程 
}
```

22.ES2016新增的功能：
（1）Array.prototype.includes():用来检查数组中是否包含某个元素。
例：

```javascript
const arr = ['apple','orange','banana']; 
console.log(arr.includes('apple'));
```

（2）指数运算符：
例：计算2的10次方
方法一：pow()

```javascript
console.log(Math.pow(2,10)); // 第一个参数为底数，第二个参数为指数
```

方法二：**

```javascript
console.log(2 ** 10);
```

23.ES2017新功能
const obj = {foo : 'value1', bar : 'value2'};
（1）对Object的三个扩展方法：
	方法一：values()：返回一个对象中所有的值组成的数组（keys()返回的是一个对象中所有的键组成的数组）

```javascript
console.log(Object.values(obj));// ['value1','value2']
```

​	方法二：enties():以数组的形式返回对象中所有的键值对

```javascript
console.log(Object.enties(obj));// [['foo','value1'],['bar','value2']]
```

​	方法三：getOwnPropertyDescriptors():获取对象中属性的完整描述信息
