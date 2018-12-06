/*
* 在node.js里通过require方法加载其他模块
* 这个加载时同步的
* 1. 找到这个文件
* 2. 读取此文件模块的内容
* 3. 把它封装在一个函数里立刻执行
* 4.执行后把模块的module.exports对象赋值给
* */

let school = require("./school");
// !function(exports,require,module,__filename,__dirname){
//     let name = "zfpx";
//     let age = 9;
//     module.exports = {name, age}
//     return  module.exports;
// }()
// debugger;
console.log(school);

console.log(module);

// [ Module {
//     id: '', 模块id  入口模块的ID永远为 .
//     exports: [Object],   //导出对象 默认是空对象
//     parent: [Circular],  //父模块 此模块是哪个模块来加载的
//     filename: 'C:\\Users\\gaopeng\\Desktop\\zhufeng-js\\架构师成长\\5.module\\school.js',  //当前模块的绝对路径
//     loaded: true, //是否加载完成
//     children: [], // 此模块加载了那些模块
//     paths: [Array] } ], //第三方模块的查找路径

