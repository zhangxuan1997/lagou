//gulp 的入口文件

//gulp的基本使用代码示例
// exports.foo = done =>{
//     console.log('foo task working~');
//     done(); //标识任务完成
// }


//gulp的组合任务代码示例
// const {series,parallel} = require('gulp');
// const task1 = done =>{
//     setTimeout(()=>{
//         console.log('task1 working~');
//         done();
        
//     },1000);
// }

// const task2 = done =>{
//     setTimeout(()=>{
//         console.log('task2 working~');
//         done();
        
//     },1000);
// }

// const task3 = done =>{
//     setTimeout(()=>{
//         console.log('task3 working~');
//         done();
        
//     },1000);
// }

//series()为一种串行的命令结构
//series():接收任意个数的参数，每个参数都可以是个任务，series()会自动按照顺序执行这些任务
// exports.foo = series(task1,task2,task3);

//parallel()为并行的命令结构
// exports.foo = parallel(task1,task2,task3);


//gulp解决异步任务的三种方式
//第一种：回调函数
// exports.callback = done =>{
//     console.log('callback task');
//     done(); 
// }

//错误优先 ；出错时，后续任务停止工作
// exports.callbackError = done =>{
//     console.log('callback task');
//     done(new Error('task failed!')); 
// }

//第二种：Promise
// exports.promise = () =>{
//     console.log('promise task');
    //返回一个成功的promise意味着这个任务结束，resolve()中不需要值，因为gulp中会忽略这个值
//     return Promise.resolve();  
// }
//当返回的是一个失败的promise时：
// exports.promiseError = () =>{
//     console.log('promise task');
//     return Promise.reject(new Error('task failed'));
// }


//第三种：async await -- Promise的语法糖，async await只是将Promise包装了起来，实质还是Promise
// const timeout = time =>{
//     return new Promise(resolve =>{
//         setTimeout(resolve,time);
//     });
// }

// exports.async = async() =>{
//     await timeout(1000);
//     console.log('async task');
    
// }


//第四种：stream
// const fs = require('fs');
// exports.stream = done =>{
//     const readStream = fs.createReadStream('package.json');
//     const writeStream = fs.createWriteStream('temp.txt');
//     readStream.pipe(writeStream);
//     readStream.on('end',()=>{
//         done()
//     })
// }