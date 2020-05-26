# 任务三：TypeScript语言

1.强类型和弱类型（按类型安全划分）

- 强类型：更强的类型约束，当规定一个参数为某一类型时，传参时的参数类型需与其规定一致；即强类型语言中不允许有任意的隐式类型转换

- 弱类型：没有什么约束

  *强类型与弱类型的差异*：

  （1）强类型不允许随意的隐式类型转换，弱类型允许
  （2）变量类型允许随时改变的特点，不是强弱类型的差异

2.静态类型：需在编译阶段做类型检查

3.JavaScript类型系统特征：弱类型 且 动态类型

4.弱类型隐患：
（1）给代码留下隐藏bug: 
	

```javascript
const obj = {}; obj.foo(); //此时，代码运行后将会报错，因为无foo()
const obj = {}; setTimeout(()={ obj.foo() },5000);//此时代码将会被留下隐藏bug
```

（2）代码输出的值与期望值不一致
	

```javascript
function sum(a,b){
		return a + b;
	}
	console.log(100,100); // 输出：200
	console.log(100,'100'); //输出：100100
```

5.强类型优势：

- 错误更早暴漏
- 代码更智能，编码更准确
- 重构更牢靠
- 减少不必要的类型判断

6.Flow--JavaScript的类型检查器
工作原理：在代码中通过添加类型注解的方式来标记代码中每个变量或参数的类型，Flow根据类型注解来检查代码中是否有类型不一致的情况。
Flow以npm模块工作
使用Flow的前提:在需要使用到Flow的文件头部添加注释: //@flow ; 这样flow文件才会去检查该文件

7.Flow编译移除注解
在js类型文件中添加类型注解编译时是报错的，所以需要在编译时删除掉类型注解，生成一个删除掉类型注解的文件
命令：*yarn flow-remove-types . -d dist*  // . 代表当前文件 dist表示会生成一个名称为dist的文件夹，删除掉类型注解的文件会生成到dist中

8.babel：JavaScript编译工具，将js编译为能够在各个浏览器运行的低版本文件

9.Flow中，undefined的类型为void；例：const str : void = undefined;

10.元组（数组类型的一种）

```javascript
const arr:[string,number] = ['foo',100]; 
//此数组从定义中说明了数组中只能有string和number两种类型，只能有两个值，第一个为string类型，第二个为number类型
```

11.Flow函数类型限制

```javascript
function foo(callback:(string,number) => void{ //void 表示此函数不能有返回值
	callback('string',100);
})
foo(function(str,n){
	// string => string
	// n => number
});
```

12.mixed类型与any类型：
当一个变量定义为mixed类型或any类型时，意味着它可以为任意类型
mixed与any的差异：any为弱类型，mixed为强类型

13.标准库：内置对象所对应的声明

14.错误消息为中文的方法

- 运行ts文件时，命令加：--locale zh-CN,即：*tsc --locale zh-CN*
- vscode -> 文件 -> 首选项 -> 设置 -> 输入"typescript local" 值改为zh-CN
  ps:不建议将错误提示设置为中文，原因：报错时中文的错误提示在chrome等搜索引擎中能够搜索到的答案少

15.数组类型
如何定义一个数组类型：

- const arr : Array<number> = [1,2,3,4]; //arr为Array类型，值为number类型
- const arr : number[] = [1,2,3,4]; //arr为Array类型，值为number类型

16.枚举类型
特点：

（1）枚举可以给一组数值取更好理解的名字；

（2）一个枚举中只会存在某些固定的值，不会有超出范围的可能性
关键字：enum
如何定义和使用一个枚举：

```javascript
enum PostStatus{

	//当枚举值为字符串时，需要手动给每个成员添加值	
	
	//当枚举值为数字时，枚举中的成员可以不用指定值，当枚举中的成员都没有指定值时，会从0开始累加，即第一个成员为0，然后依次向后累加；当枚举中的第一个成员设置了值，而之后的成员未设定时，之后成员的值从第一个成员的值开始累加，例当第一个值为3时，第二个值为4   
	
	Draft = 0,
	Unpublished = 1,
	Published =2

}
const post = {
	title:'hello typescript',
	content:'typescript is a typed superset of javascript',
	status:PostStatus.Draft
}
```

17.类型断言
const nums = [11,15,36];
const res = nums.find(i => i>0);
方式：
（1）as关键词：
const num1 = res as number;  //明确说明res为number类型
（2）<number> //JSX下不能使用此种方式，容易与标签冲突
const num2 = <number>res;

18.泛型：声明时不指定具体的类型，调用时再传递具体的类型
创建时以<T>作为标识
例：

```javascript
function createArray<T>(length:number,value:T):T[]{
	const arr = Array<T>(length).fill(value);
	return arr;
}
const res = createArray<string>(3,‘foo’); //调用createArray()时确认其为string类型
```

