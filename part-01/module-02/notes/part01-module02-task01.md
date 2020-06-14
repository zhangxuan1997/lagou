# 任务一：函数式编程范式

#### 1.学习函数式编程的原因：

- 函数式编程随着React的流行收到越来越多的关注
- Vue3也开始拥抱函数式编程
- 函数式编程可以抛弃this
- 打包过程中可以更好的利用tree shaking过滤无用代码
- 方便测试、方便并行处理
- 用很多库可以帮助进行函数式开发：lodash、underscore、ramda

#### 2.什么是高阶函数:

- 可以把函数作为参数传递给另一个函数
- 可以把函数作为另一个函数的返回结果

#### 3.常用的高阶函数：

​    forEach(),map(),filter(),every(),some(),find()/findIndex(),reduce(),sort() ...

#### 4.闭包:

在一个函数中返回了一个函数，且在返回的函数内部访问了本函数外部的函数成员

例：

```javascript
//函数作为返回值
function makeFn(){
    let msg = 'hello function';
    return function(){
        console.log(msg);
    }
}
const fn = makeFn();
fn();
```

闭包的本质：函数在执行的时候会放到一个执行栈上，当函数执行完毕之后会从执行栈上移除，但是**堆上的作用域成员因为被外部引用不能释放**，因此内部函数依然可以访问外部函数的成员

#### 5.纯函数

概念：相同的输入永远会得到相同的输出（而且没有任何可观察的副作用，类似数学中的函数）

例：

- slice（纯函数）：返回数组中的指定部分，不会改变原数组

  ```javascript
  let array = [1,2,3,4,5];
  //纯函数不改变原数组，相同的输入有相同的输出
  /*
  slice(x,y); 
  x:想要截取的元素的下标，
  y:截取到y-1的位置;例当y为3时，则为截取到下标为2的元素
  */
  console.log(array.slice(0,3)); //[1,2,3]
  console.log(array.slice(0,3)); //[1,2,3]
  console.log(array.slice(0,3)); //[1,2,3]
  ```

  

- splice（不纯的函数）：对数组进行操作返回该数组，会改变原素组

  ```javascript
  let array = [1,2,3,4,5];
  //splice(x,y):x--想要截取的元素的下标，y:想要截取的元素的数量
  console.log(array.splice(0,3)); //[1,2,3]
  console.log(array.splice(0,3)); //[4,5]
  console.log(array.splice(0,3)); //[]
  
  ```

#### 6.lodash

（1）安装lodash步骤：

- 初始化package.json:npm init -y
- 安装lodash:npm i lodash
- 在文件中引用lodash:const _ = require('lodash');

（2）使用lodash中的一些方法：

   first() / last() / toUpper() / reverse() / each()

```javascript
const _ = require('lodash');
const array = ['jack','tom','lucy','kate'];
console.log(_.first(array)); //jack,获取数组中的第一个元素
console.log(_.last(array)); //kate,获取数组中的最后一个元素
console.log(_.toUpper(_.first(array)));//JACK，将数组中的第一个元素转换为大写
console.log(_.reverse(array)); //['kate','lucy','tom','jack'],反转功能，将传入的参数倒叙输出
const r = _.each(array,(item,index){
                 console.log(item,index);
                 }); //each()作用：对数组进行遍历，第一个参数是数组，第二个参数是回调函数，回调函数中的第一个参数是数组中的每个元素：item，第二个参数是索引：index
console.log(r);
```

#### 7.纯函数好处

- 可缓存（因为纯函数对相同的输入始终有相同的输出，所以可以把纯函数结果缓存起来，lodash中具有缓存功能的方法：***memoize()***）

```javascript
const _ = require('lodash');
function getArea(r){
    return Math.PI * r * r;
}
let getAreaWithMemory = _.memorize(getArea);
//memorize()的参数是一个纯函数，memorize()内部会对纯函数进行处理，把纯函数的结果进行缓存，且memorize()方法会返回一个具有记忆功能的函数
console.log(getAreaWithMemory(4));
```

- 可测试（纯函数让测试更方便）
- 并行处理（在多线程环境下并行操作共享的内存数据很可能会出现意外情况；纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数（Web Worker））

#### 8.函数柯里化（Currying）

概念：当一个函数有多个参数时先传递一部分参数调用它（这部分参数以后永远不变），然后返回一个新的函数接收剩余的参数，返回结果。

```javascript
//柯里化示例
function checkAge(min){
    return function(age){
        return age >= min
}
//或者将上面函数使用ES6写法
let checkAge = min => (age => age >= min)

let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)

checkAge18(24)
checkAge20(20)
```

#### 9.lodash中的柯里化函数: _.curry(func)

- 功能：创建一个函数，该函数接收一个或多个func的参数，如果func所需要的参数都被提供则执行func并返回执行结果，否则继续返回该函数并接收剩余的参数
- 参数:需要柯里化的函数
- 返回值：柯里化后的函数

```javascript
const _ = require('lodash');
function getSum(a,b,c){
    return a + b + c;
}
const curried = _.curry(getSum);
/*
柯里化函数会将多元函数返回为一个一元函数
多元函数：多个参数的函数
一元函数：一个参数的函数
*/
console.log(curried(1,2,3)); //6
console.log(curried(1)(2,3)); //6
console.log(curried(1,2)(3)); //6
```

#### 10.函数组合

函数组合可以把多个函数组合成一个新的函数，其***执行顺序是从右到左***

```javascript
//示例，使用函数组合实现一个输出数组最后一个元素的功能
//思路：先反转数组元素，然后获取反转后数组中的第一个元素
function compose(f,g){
    return function(value){
        return f(g(value))
}
    
//reverse()实现反转数组中元素的功能
function reverse(array){
    return array.reverse()
}   
    
//获取数组的第一个元素
function first(array){
    return array[0]
}

/*
划重点：compose()函数的参数为两个函数，这两个函数的执行顺序是从右到左，即先执行reverse()再执行first(),first()对应compose()的f参数，reverse()对应compose()的g参数
*/
const last = compose(first,reverse);
    
console.log(last([1,2,3,4])); //4
```

#### 11.lodash中的组合函数

他们都可以组合多个函数

- flow():从左到右运行
- flowRight()从右到左运行，更常使用此方法

```javascript
//lodash中flowRight()的使用
const _ = require('lodash');
const reverse = arr => arr.reverse();
const first = arr => arr[0];
const toUpper = s => s.toUpperCase();

/*
划重点：lodash中的flowRight()方法内参数的执行顺序为从右到左，即限制性reverse函数，然后将其返回值作为参数传递给first,再将first的返回值作为参数传递到toUpper,最后toUpper的返回值即为最终值
*/
const f = _.flowRight(toUpper, first, reverse);
console.log(f['one','two','three']);//THREE
```

#### 12.函子（Functor）

- 是什么：是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）
- 容器：包含值和值的变形关系（这个变形关系就是函数）
- 为什么要学函子：为了明白在函数式编程中如何把副作用控制在可控的范围内、异常处理、异步操作等.

