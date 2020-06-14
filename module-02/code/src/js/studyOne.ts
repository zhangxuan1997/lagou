const fp = require('lodash');

const cars = [
    {name:'Ferrari FF',horsepower:660,dollar_value:700000,in_stock:true},
    {name:'Spyker C12 Zagato',horsepower:650,dollar_value:648000,in_stock:false},
    {name:'Jaguar XKR-S',horsepower:550,dollar_value:132000,in_stock:false},
    {name:'Audi R8',horsepower:525,dollar_value:114200,in_stock:false},
    {name:'Aston Martin One-77',horsepower:750,dollar_value:1850000,in_stock:true},
    {name:'Pagani Huayra',horsepower:700,dollar_value:1300000,in_stock:false}
];

/*
练习1：使用函数组合fp.flowRight()重新实现下面这个函数

let isLastInStock = function(cars){
    //获取最后一条数据
    let last_car = fp.last(cars);
    //获取最后一条数据的in_stock的属性值
    return fp.prop('in_stock',last_car);
}

*/
// let last_car = fp.last(cars);
    
// function valOne(name,val){
    
//     return `${val.name}`;
// };

// const result = fp.flowRight(valOne('in_stock',v),last_car);

// console.log(result(cars));


/*
练习4：
使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：
例如：sanitizeName(["Hello World"]) => ["hello_world"]；

let _underscore = fp.replace(/\W+/g,'_');//无需改动，并在sanitizeNames中使用它
*/
// funcsog(sanitizeNames(["Hello World"]));
