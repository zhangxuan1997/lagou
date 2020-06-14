const fp = require('lodash/fp');

const {Maybe,Container} = require('./support');

/*代码题2 练习2*/
// let xs = Container.of(['do','ray','me','fa','so','la','ti','do']);

// let ex2 = function(val){
//     let arr = val._value;
//     return fp.first(arr);
// }

// console.log(ex2(xs));


//代码题2 练习3 ：实现一个函数ex3,使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function(x,o){
    return Maybe.of(o[x]);
});
let user = {id: 2,name:'Albert'};
console.log(fp.first(user.name));
