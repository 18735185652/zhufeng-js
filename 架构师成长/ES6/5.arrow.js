/*
* 箭头函数
* 1.声明函数的更简单的方法
*
*
*
* */

// let sum = function(a,b){
//     return a+b;
// }
let sum = (a,b)=>{
    return a+b;
}
// console.log(sum(1, 2));
//如果有且只有一个参数，可以省略小括号
//如果只有返回值，没有函数体代码，则可以省略{}

//箭头函数没有自己的this，它会使用上层的this
//箭头函数虽然好，但不能应用到所有的情况。
// let obj = {
//     name:"zfpx",
//     getName(){
//         setTimeout(()=>{
//             console.log(this.name)
//         },1000)
//     }
// }
// console.log(obj.getName());

let obj8 = {
    name:"zfpx",
    getName:()=>{
        console.log(this.name);
    }
}
let obj9 = {
    name:"9",
    gN:obj8.getName
}
obj9.gN() //undefined
