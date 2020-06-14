## part1模块二作业

### 一：简答题

#### 1.描述引用计数的工作原理和优缺点

*工作原理：*设置引用数，判断当前引用数是否为0；

优点：发现垃圾时立即回收；最大限度减少程序卡顿。

缺点：无法回收循环引用的对象；时间开销大。

#### 2.描述标记整理算法的工作流程

流程：分标记和整理两个阶段，第一阶段是遍历所有对象找标记活动对象，在第二阶段即整理阶段会先执行整理，移动对象的位置，让他们在地址上实现连续，然后清除没有标记的对象，回收相应空间。

#### 3.描述V8中新生代存储区垃圾回收的流程

流程：新生代先将内部空间等分为两份，将其命名为From空间，To空间，From空间的内容会被复制到To空间，然后清除From空间的垃圾，To空间内容再置换到From空间内

#### 4.描述增量标记算法在何时使用，及工作原理

### 二：代码题

### 代码题1：

基于以下代码完成下面的四个练习

```js
const fp = require('lodash/fp');
//数据
//horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
    {name:'Ferrari FF',horsepower:660,dollar_value:700000,in_stock:true},
    {name:'Spyker C12 Zagato',horsepower:650,dollar_value:648000,in_stock:false},
    {name:'Jaguar XKR-S',horsepower:550,dollar_value:132000,in_stock:false},
    {name:'Audi R8',horsepower:525,dollar_value:114200,in_stock:false},
    {name:'Aston Martin One-77',horsepower:750,dollar_value:1850000,in_stock:true},
    {name:'Pagani Huayra',horsepower:700,dollar_value:1300000,in_stock:false}
]
```

#### 练习1：使用函数组合fp.flowRight()重新实现下面这个函数

```js
let isLastInStock = function(cars){
    //获取最后一条数据
    let last_car = fp.last(cars);
    //获取最后一条数据的in_stock的属性值
    return fp.prop('in_stock',last_car);
}
```

解答：

```js
let last_car = fp.last(cars);

function getLastCar(val){
    return fp.last(val);
}

function getInStock(name){
    return name.in_stock;
}

const result = fp.flowRight(getInStock,getLastCar);

console.log(result(cars));
```

#### 练习2：使用fp.flowRight(),fp.prop()和fp.first()获取第一个car的name

解答：

```js
const fp = require('lodash/fp');

const val = fp.flowRight(fp.prop('name',val),fp.first(arg));

console.log(val(cars));
```

#### 练习3：使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现

```js
let _average = function(xs){
    return fp.reduce(fp.add,0,xs) / xs.length;
}

let averageDollarValue = function(cars){
    let dollar_values = fp.map(function(car){
        return car.dollar_value
    },cars);
    return _average(dollar_values);
}
```

解答：

```js
const fp = require('lodash/fp');

let _average = function(xs){
    return fp.reduce(fp.add,0,xs) / xs.length;
}

const averageDollarValue = fp.flowRight(_average(val),fp.map('dollar_value',cars));

console.log(averageDollarValue(cars));
```

#### 练习4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：例如：sanitizeName(["Hello World"]) => ["hello_world"]

```js
let _underscore = fp.replace(/\W+/g,'_');//无需改动，并在sanitizeNames中使用它
```

解答：

```js
const fp = require('lodash/fp');


```

### 代码题2

基于下面提供的代码，完成后续的四个练习

```js
//support.js
class Container{
    static of(value){
        return new Container(value)
    }
    constructor(value){
        this._value = value;
    }
    map(fn){
        return Container.of(fn(this._value))
    }
}

class Maybe{
    static of(x){
        return new Maybe(x)
    }
    isNothing(){
        return this._value === null || this._value === undefined
    }
    constructor(x){
        this.value = x
    }
    map(fn){
        return this._isNothing() ? this : Maybe.of(fn(this._value))
    }
}

module.export = {
    Maybe,
    Container
}
```

#### 练习1：

使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1

```js
const fp = require('lodash/fp');

const {Maybe,Container} = require('./support');

let maybe = Maybe.of([5,6,1]);
let ex1 = //...你需要实现的位置
```

解答：

```js
//fp.add(x,y): 让x,y相加的函数,返回总和；fp.map(f,x):
```

#### 练习2：

实现一个函数ex2,能够使用fp.first获取列表的第一个元素

```
const fp = require('lodash/fp');
const {Maybe,Container} = require('./support');

let xs = Container.of(['do','ray','me','fa','so','la','ti','do']);
let ex2 = //...你需要实现的位置
```

解答：

```js
//本题文件为code/studyTwo.js
const fp = require('lodash/fp');

const {Maybe,Container} = require('./support');

let xs = Container.of(['do','ray','me','fa','so','la','ti','do']);

let ex2 = function(val){
    let arr = val._value;
    return fp.first(arr);
}

console.log(ex2(xs));
```

#### 练习3：



```js
const fp = require('lodash');

const {Maybe,Container} = require('./support');

let safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x]);
});
let user = {id: 2,name:'Albert'};
let ex3 = //你需要实现的位置
```

解答：

```js
let safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x]);
});
let user = {id: 2,name:'Albert'};
console.log(fp.first(user.name));
```

#### 练习4：

使用Maybe重写ex4,不要有if语句

```js
const fp = require('lodash/fp');
const {Maybe,Container} = require('./support');

let ex4 = function(n){
	if(n){return parseInt(n)}
}
```