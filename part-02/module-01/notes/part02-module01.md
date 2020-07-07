## 模块一：开发脚手架及封装自动化构建工具流

#### 1.前端工程化主要解决的问题：

- 传统语言或语法的弊端 
- 无法使用模块化/组件化
- 重复的机械式工作
- 难以做到代码风格统一，质量没有保证
- 依赖后端服务接口支持
- 整体依赖后端项目

#### 2.前端工程化可以从哪些方面出发：

模块化、组件化、规范化、自动化

#### 3.常用的脚手架工具：

- React项目：create-react-app
- Vue.js项目：vue-cli
- Angular项目：angular-cli

#### 4.Yeoman：用于创造现代化web应用的脚手架工具

（1）Yeoman的基本使用：

​			（前提：本次的Yeoman安装使用的yarn命令，所以首先在node环境中安装yarn:***npm install -g yarn***）

​				1) 安装Yeoman：yarn global add yo;

​				2) Yeoman需搭配特定的generator使用，所以搭建项目时需找到对应项目类型的generator，例生成node module项目（即node模块）需使用generator-node模块，即先安装generator-node：***yarn global add generator-node***

​				3） 通过yo运行generator，具体步骤为：a: cd path/to/project-dir 进入想要创建项目的目录; b: mkdir my-module 通过命令创建一个文件夹（这步可有可无）； c: yo node 此命令会创建一个项目

#### 5.Generator本质上是一个NPM模块

- generator特定的结构：

![image-20200618145021501](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200618145021501.png)

上方为默认结构，下方为需要提供多个sub generator时添加的新的生成器目录，即新增了component目录

- generator名称须为：generator-<name>的格式，例：generator-node

#### 6.

创建generator文件,例：generators/app/index.js:

```js
//此文件作为generator的核心入口
//需要导出一个继承自Yeoman Generator的类型
//Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
//我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入
const Generator = rquire('yeoman-generator');

module.exports = class extends Generator{
    writing(){
        //Yeoman 自动在生成文件阶段调用此方法
        //我们这里尝试往项目中写入文件
        this.fs.write(
        this.destinationPath('temp.txt')),
        Math.random().toString()
    }
}
```

在generator文件路径下执行***yarn link***将模块连接到全局范围，使之成为一个全局模块包

#### 7.

模板文件路径使用***templatePath()***,输出目标路径使用***desLinationPath()***

```js
//此文件作为generator的核心入口
//需要导出一个继承自Yeoman Generator的类型
//Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
//我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入
const Generator = rquire('yeoman-generator');

module.exports = class extends Generator{
    writing(){
        //Yeoman 自动在生成文件阶段调用此方法
        //我们这里尝试往项目中写入文件
        //this.fs.write(
        //this.destinationPath('temp.txt')),
       // Math.random().toString()
        const tmpl = this.templatePath('foo.txt');
        const output = this.destinationPath('foo.txt');
        const context = {title:'hello world',success:false}
        this.fs.copyTpl(tmpl,output,context);
    }
}
```

#### 8.Plop:小而美的脚手架工具

主要用于创建项目中特定类型文件的工具

#### 9.如何使用Plop

- 将Plop作为npm模块先安装：***yarn/npm add plop --dev***
- 在项目根目录下新建文件:plopfile.js,此文件为plop工作的入口文件，这个文件内需要导出一个函数，这个函数需要接收一个plop对象，这个对象中提供一系列的工具函数，用于创建生成器任务

```js
//plopfile.js
module.exports = plop =>{
    //setGenerator()有两个参数：生成器名称，生成器配置选项
    plop.setGenerator('component',{
        //对生成器的描述
        description:'create a component', 
        //prompts:指定generator工作时会发出的命令行问题
        prompts:[{
            type:'input',
            name:'name',
            message:'component name',
            default:'MyComponent'
        }],
        //actions:生成器完成命令行交互后需要执行的一些动作
        actions:[
            {
                type:'add',//添加文件
                //path:添加文件的路径
                path:'src/components/{{name}}/{{name}}.js',
                //templateFile:添加的文件的模板文件
                templateFile:'plop-templates/component.hbs'
            }
        ]
    });
}
```

- 在plopfile.js中定义脚手架任务
- 编写用于生成特定类型文件的模板
- 通过plop提供的CLI运行脚手架任务

#### 10.自动化构建工作流

作用：脱离运行环境兼容带来的问题。

使用提高效率的语法、规范和标准

#### 11.NPM Scripts

- 介绍：实现自动化构建工作流的最简方式

- 具体使用：在package.json中，添加”scripts“字段，该字段为对象，这个对象中的键为scripts名称，其值为将要执行的命令

```js
//package.json
{
    "scripts":{
        //若使用npm运行该命令则应使用npm run 为前缀，即命令应为：npm run build;若使用yarn运行，则直接yarn 键 即：yarn build
        "build":"sass scss/main.scss css/style.scss"
    }
}
```

#### 12.browser-sync 

作用：此模块的作用是启动一个测试服务器

使用步骤：

- 为项目安装browser-sync模块：yarn add browser-sync --dev;

- 在package.json的scripts中添加：

  ```js
  //package.json
  {
      "scripts":{
          "serve":"browser ."
      }
  }
  ```

- 通过命令：yarn serve将其运行起来，运行后，将自动启动web服务器且唤起浏览器打开网页

#### 13.NPM Scripts的钩子机制

```js
//package.json
{
    "scripts":{
        "build":"sass scss/main.scss css/style.scss",
         //preserve:会自动在serve命令执行之前执行
         "preserve":"yarn build",
         //此时，在执行yarn serve时，就会先执行yarn build命令
         "serve":"browser-sync" build
    }
}
```

#### 14.--watch

```js
//package.json
{
    "scripts":{
        "build":"sass scss/main.scss css/style.scss --watch",
         //preserve:会自动在serve命令执行之前执行
         "preserve":"yarn build",
         //此时，在执行yarn serve时，就会先执行yarn build命令
         "serve":"browser-sync" build
    }
}
```

添加--watch后会sass会自动监听文件

#### 15.  模块:npm-run-all

安装：yarn add npm-run-all --dev

作用:同时运行多个任务。

安装好后，可以在package.json的scripts属性中添加以下"start"去实现同时运行多个命令的代码：

```js
//package.json
{
    "scripts":{
       	"build":"sass scss/main.scss css/style.css --watch",
        "serve":"browser-sync .",
        "start":"run-p build serve"
    }
}
```

#### 16." --file \\"css/*.css\\" "

```js
//package.json
{
    "scripts":{
       	"build":"sass scss/main.scss css/style.css --watch",
        "serve":"browser-sync . --file \"css/*.css\",
        "start":"run-p build serve"
    }
}
```

作用：监听一些文件，当监听的文件发生变化后，browser-sync会将这些变化的内容自动同步到浏览器，更新浏览器的界面

#### 17.Gulp简介

gulp:自动化构建工具，解决了Grunt（同为自动化构建工具，对文件的处理是通过构建临时文件完成）中构建速度慢的问题，基于内存实现，对文件的处理是在内存中完成，相对于磁盘读写（Gurnt的文件处理方式）更快，默认支持同时进行多个任务，效率更高；使用方式更加直白易懂，插件生态完善，

#### 18.Grunt基本使用

- 在一个空项目中：***yarn init --yes***:得到package.json文件
- ***yarn add grunt*** : 添加grunt模块
- 项目根目录下添加gruntfile.js文件：***code gruntfile.js***(使用命令行创建一个文件)

```js
//gruntfile.js
//Grunt 的入口文件
//用于定义一些需要 Grunt 自动执行的任务，需要导出一个函数，这个函数接收一个Grunt的形参，内部提供一些创建任务时可以用到的API
module.exports = grunt =>{
    
    //registerTask():注册一个任务；两个参数:指定任务名字，指定任务函数
    grunt.registerTask('foo',()=>{
        console.log('hello grunt~');
    });
}
```

- yarn grunt foo :  yarn 会自动找到所在文件的node_modules中所提供的一些命令，foo为任务的名称，执行此命令，grunt会自动执行foo命令

#### 19.Grunt文件

```js
//gruntflie.js
/*
Grunt 的入口文件
用于定义一些需要Grunt自动执行的任务
需要导出一个函数
此函数接收一个grunt的形参，内部提供一些创建任务时可以用到的API
*/
module.exports = grunt =>{
    grunt.registerTask('foo',()=>{
        console.log('hello grunt');
    });
    grunt.registerTask('bar','任务描述',()=>{
		console.log('other task');
    });
   
    grunt.registerTask('default',['foo','bar']);
    //执行yarn grunt default 会执行default这个务，即依次执行foo,bar这两个任务
    
    // grunt.registerTask('async-task',()=>{
        // setTimeout(()=>{
            // console.log('async task workding~');
        // },1000);
    // });
    
    grunt.registerTask('async-task',function(){
        //涉及到this指向问题，所以使用函数function而不是箭头函数
        const done = this.async();
        setTimeout({
            console.log('async task working~');
        },1000);
    });
}
```

#### 20.Grunt标记任务失败以及标记任务失败后的解决方法

- 当任务为同步任务时，一个任务失败如何让之后的任务能够执行

  ```js
  //gruntfile.js
  module.exports = grunt =>{
      grunt.registerTask('bad',()=>{
          console.log('bad workding~');
          return false;
      });
      grunt.registerTask('foo',()=>{
          console.log('foo task~');
      });
      grunt.registerTask('bar',()=>{
          console.log('bar task~');
      });
      grunt.registerTask('default',['foo','bad','bar']);
  }
  ```

  此时执行 yarn grunt default ,当代码执行到bad方法时会失败，如何解决：

  将命令修改为：***yarn grunt default --force***

- 当任务为异步任务时，一个任务失败如何让之后的任务能够执行

  异步任务中，无法通过return false来标记任务失败，所以通过给异步的回调函数指定一个false的实参来标记为失败

  ```js
  //gruntfile.js
  module.exports = grunt =>{
      grunt.registerTask('bad',()=>{
          console.log('bad workding~');
          return false;
      });
      grunt.registerTask('foo',()=>{
          console.log('foo task~');
      });
      grunt.registerTask('bar',()=>{
          console.log('bar task~');
      });
      grunt.registerTask('default',['foo','bad','bar']);
      grunt.registerTask('async-task',function(){
          const done = this.async;
          setTimeout((){
          	console.log('async task'); 
              done(false);     
          },1000)
      });
  }
  ```

  此时执行yarn grunt async-task 结果也为失败

#### 21.Grunt的配置方法

- initConfig(）
- config()

```js
//gruntfile.js
module.exports = grunt =>{
    //initConfig()：可以在此函数中定义属性，属性值可以为字符串也可以为对象
    grunt.initConfig({
        foo:"bar"
    });
    grunt.registerTask('foo',()=>{
        
        //使用grunt.config()方法来获得grunt.initConfig()方法中的属性的值
        console.log(grunt.config('foo')); 
    });
}
```

当grunt.initConfig()中属性的值为对象时：

```js
//gruntfile.js
module.exports = grunt =>{
    //initConfig()：可以在此函数中定义属性，属性值可以为字符串也可以为对象
    grunt.initConfig({
        foo:{
            bar:123
        }
    });
    grunt.registerTask('foo',()=>{
        
        //使用grunt.config()方法来获得grunt.initConfig()方法中的属性的值
        console.log(grunt.config('foo.bar')); 
    });
}
```

#### 22.Grunt多目标任务

```js
//gruntfile.js
module.exports = grunt =>{
    grunt.initConfig({
        build:{
            options:{
                foo:'bar'
            },
            css:{
                foo:'baz'
            },
            js:'2'
        }
    });
    
    //多目标模式，可以让任务根据配置形成多个子任务
    grunt.registerTask('build',function(){
        console.log(this.options);
        console.log(`target:${this.target},data:${this.data}`);
    })
}
```

运行结果为：

![image-20200625185759740](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200625185759740.png)

#### 23.Grunt插件的使用

例：grunt-contrib-clean  作用：清除一些无用的临时文件

步骤:

- 安装：yarn add grunt-contrib-clean

- 在gruntfile.js中使用：

  ```js
  //gruntfile.js
  module.exports = grunt =>{
      grunt.initConfig({
          clean:{
              temp:'temp/**'
          }
      })
      grunt.loadNpmTasks('grunt-contrib-clean');
  }
  ```

- 在命令行输入：***yarn grunt clean*** 即可（命令行中为clean而不是全称grunt-contrib-clean，因为grunt-contrib-为通用前缀）

#### 24.Grunt常用插件

- grunt-sass

  grunt-sass需要有模块支持，所以使用npm提供的sass模块，所以安装时应为：***yarn add grunt-sass sass --dev***

  grunt-sass为多目标任务，所以需要在initConfig()中指定

  ```js
  //gruntfile.js
  const sass = require('sass');
  
  module.exports = grunt =>{
      grunt.initConfig({
          sass:{
              options:{
                  sourceMap:true,
  				implementation:sass // 指定使用sass模块处理编译
              }
              main:{
                  files:{
                      'dist/css/main.css':'src/scss/main.scss'
                  }
              }
          }
      });
      
      grunt.loadNpmTasks('grunt-sass'); //引入grunt-sass
  }
  ```

- grunt-babel

  grunt-babel同样需要babel核心模块babel的支持，所以安装命令为：***yarn add grunt-babel @babel/core @babel/preset --env --dev***

  @babel/core ：私有名称；@babel/preset：预设

  ```js
  //gruntfile.js
  const sass = require('sass');
  const loadGruntTasks = require('load-grunt-tasks');
  
  module.exports = grunt =>{
      grunt.initConfig({
          sass:{
              options:{
                  sourceMap:true,
  				implementation:sass // 指定使用sass模块处理编译
              }
              main:{
                  files:{
                      'dist/css/main.css':'src/scss/main.scss'
                  }
              }
          },
          babel:{
              options:{
                  sourceMap:ture
              	presets:['@babel/presets-env']         
              }         
          	main:{
              	files:{
                  	'dist/js/app.js':'src/js/app.js'     
                  }       
              }             
          }             
      });
      
      //grunt.loadNpmTasks('grunt-sass'); //引入grunt-sass
  	loadGruntTasks(grunt); //loadGruntTasks会自动加载所有grunt插件中的任务
  }
  ```

  

- 模块越来越多时，loadNpmTasks()的使用也会越来越多，loadNpmTasks模块可以减少loadNpmTasks的使用；

  安装：***yarn add load-grunt-tasks --dev***

  ```js
  //gruntfile.js
  const sass = require('sass');
  const loadGruntTasks = require('load-grunt-tasks');
  
  module.exports = grunt =>{
      grunt.initConfig({
          sass:{
              options:{
                  sourceMap:true,
  				implementation:sass // 指定使用sass模块处理编译
              }
              main:{
                  files:{
                      'dist/css/main.css':'src/scss/main.scss'
                  }
              }
          }
      });
      
      //grunt.loadNpmTasks('grunt-sass'); //引入grunt-sass
  	loadGruntTasks(grunt); //loadGruntTasks会自动加载所有grunt插件中的任务
  }
  ```

- 文件修改后自动编译 ：grunt-contrib-watch

  安装：yarn add grunt-contrib-watch --dev;

  ```js
  //gruntfile.js
  const sass = require('sass');
  const loadGruntTasks = require('load-grunt-tasks');
  
  module.exports = grunt =>{
      grunt.initConfig({
          sass:{
              options:{
                  sourceMap:true,
  				implementation:sass // 指定使用sass模块处理编译
              }
              main:{
                  files:{
                      'dist/css/main.css':'src/scss/main.scss'
                  }
              }
          },
          babel:{
              options:{
                  sourceMap:ture
              	presets:['@babel/presets-env']         
              }         
          	main:{
              	files:{
                  	'dist/js/app.js':'src/js/app.js'     
                  }       
              }             
          },
          watch:{
              js:{
                  files:['src/*.js'],
                  tasks:['babel']
              },
              css:{
                  files:['src/scss/*.scss'],
                  task['sass']
              }
          }
      });
      
      //grunt.loadNpmTasks('grunt-sass'); //引入grunt-sass
  	loadGruntTasks(grunt); //loadGruntTasks会自动加载所有grunt插件中的任务
  	grunt.registerTasks('default',['sass','babel','watch'])
  }
  ```

#### 25.Gulp的基本使用

- 空项目中：yarn init --yes

- yarn add gulp --dev

- 创建gulpfile.js

  ```js
  //gulp 的入口文件
  exports.foo = () =>{
      console.log('foo task working~');
      
  }
  ```

  此时会报错：

  ![image-20200625231244684](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200625231244684.png)

报错：foo任务执行没有完成；

原因：最新版gulp中取消了同步代码模式，约定每个任务需为异步任务，任务执行完成后需要调用回调函数来标记这个任务已经完成；

解决方法：手动调用一个回调函数，来标识任务完成

```js
//gulp 的入口文件
exports.foo = done =>{
    console.log('foo task working~');
    done(); //标识任务完成
}
```

(任务名称为default时，会将其作为默认任务，若想要运行default任务，直接输入命令 yarn gulp即可，会自动执行default任务)

#### 26.Gulp创建组合任务

- series():串行，多个任务依次启动

```js
//gulp 的入口文件

//gulp的基本使用代码示例
// exports.foo = done =>{
//     console.log('foo task working~');
//     done(); //标识任务完成
// }


//gulp的组合任务代码示例
const {series,parallel} = require('gulp');
const task1 = done =>{
    setTimeout(()=>{
        console.log('task1 working~');
        done();
        
    },1000);
}

const task2 = done =>{
    setTimeout(()=>{
        console.log('task2 working~');
        done();
        
    },1000);
}

const task3 = done =>{
    setTimeout(()=>{
        console.log('task3 working~');
        done();
        
    },1000);
}

//series()为一种串行的命令结构
//series():接收任意个数的参数，每个参数都可以是个任务，series()会自动按照顺序执行这些任务
exports.foo = series(task1,task2,task3);
```

启动后为：

![image-20200625233049521](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200625233049521.png)

- parallel(): 并行，任务会同时启动

```js
//gulp 的入口文件

//gulp的基本使用代码示例
// exports.foo = done =>{
//     console.log('foo task working~');
//     done(); //标识任务完成
// }


//gulp的组合任务代码示例
const {series,parallel} = require('gulp');
const task1 = done =>{
    setTimeout(()=>{
        console.log('task1 working~');
        done();
        
    },1000);
}

const task2 = done =>{
    setTimeout(()=>{
        console.log('task2 working~');
        done();
        
    },1000);
}

const task3 = done =>{
    setTimeout(()=>{
        console.log('task3 working~');
        done();
        
    },1000);
}

//series()为一种串行的命令结构
//series():接收任意个数的参数，每个参数都可以是个任务，series()会自动按照顺序执行这些任务

//parallel()为并行的命令结构
exports.foo = parallel(task1,task2,task3);
```

运行结果为：

![image-20200625233234465](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200625233234465.png)

- series()与parallel()的使用场景区别：

  css与js互不干扰，因此可以并行，使用parallel(); 在构建代码时需先编译，因此需使用series()

#### 27.Gulp解决异步任务的三种方式

- 回调函数 callback

  ```js
  //gulpfile.js
  //gulp解决异步任务的三种方式
  //第一种：回调函数
  exports.callback = done =>{
      console.log('callback task');
      done(); 
  }
  
  //错误优先 ；出错时，后续任务停止工作
  exports.callbackError = done =>{
      console.log('callback task');
      done(new Error('task failed!')); 
  }
  ```

- Promise

  ```js
  //第二种：Promise
  exports.promise = () =>{
      console.log('promise task');
      ////返回一个成功的promise意味着这个任务结束，resolve()中不需要值，因为gulp中会忽略这个值
      return Promise.resolve();  
  }
  //当返回的是一个失败的promise时：
  exports.promiseError = () =>{
      console.log('promise task');
      return Promise.reject(new Error('task failed'));
  }
  ```

- async await

  ```js
  //第三种：async await -- Promise的语法糖，async await只是将Promise包装了起来，实质还是Promise
  const timeout = time =>{
      return new Promise(resolve =>{
          setTimeout(resolve,time);
      });
  }
  
  exports.async = async() =>{
      await timeout(1000);
      console.log('async task');
      
  }
  ```

- stream

  ```js
  //第四种：stream
  const fs = require('fs');
  exports.stream = done =>{
      const readStream = fs.createReadStream('package.json');
      const writeStream = fs.createWriteStream('temp.txt');
      readStream.pipe(writeStream);
      readStream.on('end',()=>{
          done()
      })
  }
  ```


#### 28.Gulp构建过程核心工作原理：

![image-20200626180208929](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200626180208929.png)

具体代码示例：

```js
//gulpfile.js
const fs = require('fs');
const {Transform} = require('stream');
exports.default = () =>{
    
    //文件读取流 ;读取此文件的内容
    const read = fs.createReadStream('normalize.css');
    
    //文件写入流 ;将读取到的文件内容写入到此文件
    const write = fs.createWriteStream('normalize.min.css');
    
    //文件转换流 ;将读取到的文件内容进行转换，然后写入到设定的文件中
    const transform = new Transform({
        transform:(chunk,encoding,callback) =>{
            //核心转换过程实现
            //chunk => 读取流中读取到的内容（Buffer）
            const input = chunk.toString();
            
            //将读取到的内容转换为字符串后，去除其中的空格和注释 ，然后callback
            coonst output = input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'');
            callback(output);
        }
    });
    
    //把读取出来的文件流导入写入文件流
    read
    	.pipe(transform) //转换
    	.pipe(write) //写入
    
   	return read
}
```

#### 29. 

安装：yarn add gulp-clean-css --dev;

作用：对css文件完成压缩转换；

使用：

```js
//gulpfile.js
const {src,dest} = require('gulp');
const cleanCss = require('gulp-clean-css');
exports.default = () =>{
    return src('css/*.css').pipe(cleanCss()).pipe(dest('dist'));
}
```

#### 30.gulp-rename

安装：yarn add gulp-rename --dev;

作用：给编译后的文件重命名；

使用：extname:指定重命名的扩展名，使用后，index.css 将变为 index.min.css

```js
//gulpfile.js
const {src,dest} = require('gulp');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename')
exports.default = () =>{
    return src('css/*.css').pipe(cleanCss()).pipe(rename(extname:'.min.css')).pipe(dest('dist'));
}
```

#### 31.gulpfile.js中的base用法

当src中的文件编译到dist时，如何让src中的文件在dist也保持相同的目录名称结构，使用base可解决

![image-20200626215615251](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200626215615251.png![image-20200626215821872](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200626215821872.png)

执行：yarn gulp style 来运行

#### 32.gulp-sass

对于一些用来被引用的scss文件，可将其命名为_开头，例：\_defined.scss,因为gulp-sass在编译scss文件时，会认为这些文件为引用文件，在编译时会忽略这些文件。

gulp-sass有outputStyle属性，可用来设置一些文件内容的样式。

#### 33.gulp脚本编译：gulp-babel

![image-20200626221236810](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200626221236810.png)

#### 34.图片和字体文件的转换：gulp-imagemin; 

安装：yarn add gulp-imagemin --dev;

使用：

```js
//gulpfile.js
const imagemin = require('gulp-imagemin');

//图片
const image = () =>{
    return src('src/assets/**',{base:'src'})
    		.pipe(imagemin())
    		.pipe(sest('dist'))
}

//字体文件 ;对字体文件的处理是拷贝到dist
const font = () =>{
    return src('src/assets/**',{base:'src'})
    		.pipe(imagemin())
    		.pipe(sest('dist'))
}
```

#### 35.其他文件和文件清除

- 其他文件：对于其他文件的处理，先让它们直接拷贝到dist

  ```js
  //gulpfile.js
  const estra = () =>{
      return src('public/**',{base:'src'}).pipe(dest('dist'));
  }
  
  module.exports = {
      extra
  }
  ```

- 文件清除 :使用del插件,yarn add del --dev

  ```js
  //gulpfile.js
  const del = require('del');
  
  const clean = () =>{
      return del(['dist']);
  }
  ```

  注意：文件清除操作与其他文件编译压缩操作应为先后顺序，所以使用series()

  ```js
  //gulpfile.js
  const del = require('del');
  
  const clean = () =>{
      return del(['dist']);
  }
  
  const compile = parallel(style,script,page,image,font);
  
  const build = series(clean,parallel(compile,extra));
  
  module.exports = {
     build
  }
  ```

#### 37.自动加载插件：gulp-load-plugins

#### 38.服务器：browser-sync

安装：yarn add browser-sync --dev;

browser-sync不是gulp插件，只是在gulpfie.js中使用

使用：

```js
//gulpfile.js
const browserSync = require('browser-sync');

const bs = browserSync.create();

const serve = () =>{
    bs.init({
        notigy:flase,//让浏览器不提示某个提示
        port:3000, //指定端口
        open:false,//是否自动打开浏览器
        files:'dist/**',//监听某个文件，这里的意思是监听dist文件夹下的文件
        server:{
            baseDir:'dist',
            routes:{ //routes作用：将dist文件夹下某些文件的某个值进行改变，
                '/node_modules':'node_moudles'
            }
        }
    });
}
```

#### 39.gulp-useref

作用：将一些需要引用的文件（例如css文件）合并到指定的文件中；

安装：yarn add gulp-useref --dev

使用：

```js
//gulpfile.js
const useref = () =>{
    
     //src()的作用：指定将对哪个目录或文件进行操作，即第一个参数
    return src('dist/*.html',{base:'dist'})
        .pipe(plugins.useref({ searchPath:['dist','.'] }))
    	.pipe(dest('dist'))
}
```

以上代码执行前文件为:

![image-20200628201441290](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200628201441290.png)

执行gulpfile.js之后，文件为:

![image-20200628201512298](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200628201512298.png)

且相应的，dist文件夹会生成需要的文件夹，例assets文件夹

#### 40.文件压缩：gulp-htmlmin(压缩html); gulp-uglify(压缩js); gulp-clean-css(压缩css)

#### 41.gulp-if

由于html,css，js是三种不同类型的文件，需要对其进行不同的操作，所以需要gulp-if来进行判断

```js
//gulpfile.js
//压缩文件的作用，生成的是需要上线的文件
const useref = () =>{
    
     //src()的作用：指定将对哪个目录或文件进行操作，即第一个参数
    return src('dist/*.html',{base:'dist'})
        .pipe(plugins.useref({ searchPath:['dist','.'] }))
    	//判断是否以.js结尾，即判断是否为js文件，如果是则执行第二个参数（压缩js文件）
    	.pipe(plugins.if(/\.js$/,plugins.uglify())) 
    	.pipe(plugins.if(/\.css$/,plugins.cleanCss())) 
    	.pipe(plugins.if(/\.html$/,plugins.htmlmin({
        	collapseWhitespace:true,
        	minifyCss:true,
        	minifyJs:true
    }))) 
    	.pipe(dest('release'))
    	//将最终需要上线的文件放到文件夹release中
    	//collapseWhitespace:true  是否折叠掉空白字符；
    	//minifyCss:是否折叠html文件中css样式的空白字符；
    	//minifyJs:是否折叠html文件中js的空白字符；
}
```

#### 42.cwd()

作用：返回当前命令行所在的工作目录。

例如在C:\study\lagouStudy\lagou\part-02\module-01\notes此命令行执行包含cwd()方法的文件，则返回C:\study\lagouStudy\lagou\part-02\module-01\notes

#### 43.FIS

核心特点：高度集成；核心特性：资源定位；

使用：yarn global add fis3

fis3 release -d output：指定编译后的文件夹名称为output

作用：

- 资源的定位；即将文件中一些文件的相对定位路径更改为绝对定位的路径