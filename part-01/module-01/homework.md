# 简答题

## 1.请说出下列最终执行结果，并解释为什么？

```javascript
var a = [];
for(var i = 0; i < 10; i++){
    a[i] = function(){
        console.log(i);
    }
}
a[6]();
```

结果：10

原因：i 为var 定义

## 2.请说出下列最终执行结果，并解释为什么？

```javascript
var tmp = 123;
if(true){
    console.log(tmp);
    let tmp;
}
```

结果：报错

原因：if中在输出代码的后面，使用let定义了tmp，let不会进行变量提升，所以在此之前输出tmp为错误写法



## 3.结合ES6新语法，用最简单的方式找出数组中的最小值？

```javascript
var arr = [12,34,32,89,4];
```

步骤：

```javascript
let arr = [12,34,32,89,4];
let num = (arg) =>{
    console.log(Math.min(...arg));
};
num(arr);
```



## 4.请详细说明var，let，const三种声明变量的方式之间的具体差别？

差别：

1. var 和let定义的变量值可以改变，const定义的变量值不可改变；
2. var声明的变量在全局作用域中有效，let声明的变量在块级作用域中有效
3. var存在变量提示，let不存在变量提升
4. var可以对一个变量声明多次，let不能重复声明变量

## 5.请说出下列代码最终输出的结果，并解释为什么？

```javascript
var a = 10;
var obj = {
    a:20,
    fn:(){
    setTimeout(()=>{
        console.log(this.a);
    });
}
};
obj.fn();
```

结果：抛出错误，a is undefined

原因：调用的fn()中的this指向为setTimeout()，在setTimeout()中并没有定义a。

## 6.简述symbol类型的用途？

用途：表示一个独一无二的值，用来区分容易混淆的属性名

## 7.说说什么时浅拷贝、什么时深拷贝？

浅拷贝：拷贝一个对象中的数据，但是不拷贝该对象中的子对象

深拷贝：克隆出一个对象，数据相同，但引用地址不同，即：拷贝一个对象中的数据，也拷贝该对象中的子对象。

## 8.谈谈你是如何理解js异步编程的，Event Loop是做什么的，什么是宏任务，什么是微任务？

***js异步编程***：异步不会等待一个任务结束后才开始执行下一个，对于耗时操作，开启过后就立即往后执行下一个任务，后续逻辑一般会通过回调函数的方式定义。

***Event Loop***： Loop是计算机系统的一种运行机制，js采用这种机制来解决单线程运行带来的问题，主要用来等待和发送消息和事件，即：在程序中设置两条线程，一个负责程序本身的运行，成为主线程；另一个负责主线程与其他进程的通信。

***宏任务与微任务***：回调队伍中的任务称之为宏任务，宏任务执行过程中可以临时加额外需求，这些额外需求可以选择作为一个新的宏任务进入到队伍中排队，也可以直接在当前任务结束后立即执行，此时称其为微任务。

## 9.将下面异步代码使用Promise改进？

```javascript
setTimeout(function(){
    var a = 'hello';
    setTimeout(function(){
        var b = 'lagou';
        setTimeout(function(){
            var c = 'I love you';
            console.log(a+b+c);
        },10);
    },10);
},10);
```

改进：

```javascript
Promise.resolve().then(()=>{let a = 'hello'; console.log(a);}).then(()=>{let b = 'lagou'; console.log(b);}).then(()=>{let c = 'I love you'; console.log(c); });
```

## 10.请简述TypeScript与JavaScript之间的关系？

关系：typescript是JavaScript的超集，typescript包括JavaScript

## 11.请谈谈你所认为的typescript优缺点？

优点：

1. typescript增加了代码的可读性和可维护性
2. typescript非常包容，是JavaScript的超集
3. 拥有活跃的社区

缺点：

1. 需要学习成本
2. 对于短期项目来说会增加开发成本