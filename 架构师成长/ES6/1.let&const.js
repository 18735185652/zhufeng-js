/*
* var
* 1.可以重复的声明
* 2.不能定义常量 var PI = 3.14
* 3.不支持块级作用域 if(true){var a = 10};
* */

// Identifier 'a' has already been declared 变量名已经定义过了 不能重复声明
// let a = 10;
// let a = 20;

// const PI = 3.14;
//试图给一个常量赋值，这是错误的
//PI = 3.15  //Assignment to constant variable. 分配到恒定的变量。

// if(true){
//     var a = 10;
// }
// console.log(a); //10

// if(true){
//     let a = 10;
// }
// console.log(a); //a is not defined

//闭包写法  以前JS只有2个作用域 一个全局  一个函数级作用域
// ;(function(){
//
// })()
//
// let a = 10;
//
// {
//     console.log(a);  //a is not defined
//     //let 没有预解释
//     let a = 10
// }


// for(let i = 0;i<3;i++){
//     setTimeout(function(){
//         console.log(i);
//     },1000)
// }

//let实现原理
// for(var i = 0;i<3;i++){
//     (function(i){
//         setTimeout(function(){
//             console.log(i);
//         })
//     })(i)
// }

//let拆分
// "use strict";
//
// var _loop = function _loop(i) {
//     setTimeout(function () {
//         console.log(i);
//     }, 1000);
// };
//
// for (var i = 0; i < 3; i++) {
//     _loop(i);
// }

// const PI = 3.14;
// console.log(PI);
// //虽然说常量不能再引用别的对象了，但是它的值如果是一个引用类型的话，引用对象的属性还是可以改的
// const USER = {name:"zupx"};
// USER.name="zfpx2";
//
// {
//     const PI = 3.14;
// }

//ES6中新增加的二种声明变量的方式，可以解决以前var的一些问题
