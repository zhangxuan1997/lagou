

# 任务二：JavaScript异步编程

1.JavaScript采用单线程模式工作的原因：
单线程：js执行环境中负责执行代码的线程只有一个

2.

- 同步模式（synchronous）:代码中的任务依次执行
- 异步模式（asynchronous）:不会等待一个任务的结束才去开始下一个任务，对于耗时操作，开启过后就立即往后执行下一个任务，后续逻辑一般会通过回调函数的方式定义

3.回调函数：所有异步编程方案的根基

4.then()
每一个then()实际是为上一个then()返回的promise对象添加状态明确过后的回调

5.
promise对象的then()会返回一个全新的promise对象
后面的then()就是在为上一个then()返回的promise注册回调
前面then()中回调函数的返回值会作为后面then()回调的参数
如果回调中返回的是promise，那后面then()的回调会等待它的结果  
例：

```javascript
ajax('./ajax/users.json')
.then(function(resolve){ console.log('1'); })
.then( return ajax('./ajax/users.json') )
.then(function(resolve){console.log(resolve)})
.then(function(resolve){console.log('1')});
```

第二个then()内为ajax请求，所以第三个then()内接受到的参数实际上为第二个then()中请求返回的值；第四个then()依然为第一个ajax请求服务

6.catch()
相当于then(),不过第一个参数为undefined
catch()指定失败回调更常见因为这种方式更适合于链式调用

7.链式调用时，建议使用then()和catch()分开指定成功的回调和失败的回调（then()指定成功的回调，catch()指定失败的回调）

8.Promise.all()
将多个promise合并为一个promise
例：

```javascript
var promise = Promise.all([
	ajax('/api/users.json'),
	ajax('/api/users.json')
]);
promise.then(function(values){
	console.log(values); // 成功后返回的values是一个数组，该数组中包含着每个异步任务执行后的结果
}).cathc(funtion(error){
	console.log(error);
});
```

当使用Promise.all()时，需要所有异步任务都成功结束，才会成功，否则则为失败

9.Promise.race()
同样可以将多个promise对象组合为一个promise对象
与Promise.all()的不同：
Promise.all()等待所有任务结束才会结束，Promise.race()只等待第一个结束的任务

10.宏任务与微任务
回调队伍中的任务称之为--宏任务，宏任务执行过程中可以临时加上一些额外需求，这些额外需求可以选择作为一个新的宏任务进到队列中排队，
也可以作为当前任务的微任务，直接在当前任务结束过后立即执行；Promise的回调会作为微任务执行
例：

```javascript
setTimeout(()=>{console.log('setTimeout')},0);
Promise.resolve()
.then(()=>{console.log('promise');})
.then(()=>{console.log('promise 1');})
.then(()=>{console.log('promise 2');});
//输出顺序为：
//promise
//promise 1
//promise 2
//setTimeout
```

then()作为promise的微任务，无需进入队列中排队等待执行，而是紧跟着promise执行，
而setTimeout中的内容作为宏任务，进入到队列中排队，然后再执行

11.微任务的目的：提高整体的响应能力

12.目前绝大多数异步调用都是作为宏任务执行， 而Promise、MutationObserver和node中的process.nextTick都是作为微任务，直接在本轮调用的末尾
执行

13.更优的异步编程写法
（1）Generator


this指向：this指向取决于调用，而不是定义

this指向谁取决于调用，不取决于定义 沿着作用域向上找最近的一个function，看这个function最终怎么样执行的
