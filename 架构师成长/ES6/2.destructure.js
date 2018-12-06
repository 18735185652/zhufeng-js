/*
* 解构 分解一个对象的结构
*
* */

let arr = [1,2,3];
// let a = arr[0];
// let b = arr[1];
// let c = arr[2];
//
// console.log(a,b,c)

//解构的时候，等号的二边结构类似，右边还必须是一个真实的值
// let [a,b,c] = arr;
// console.log(a,b,c);

// let arr2 = [{name:"xfpx",age:9},[1,2],3];
// let [{name,age},[d,e],f] = arr2;
// console.log(name,age,d,e,f); //xfpx 9 1 2 3
// let [json,arr3,f] =arr2
// console.log(json,arr3,f) //{ name: 'xfpx', age: 9 } [ 1, 2 ] 3

// let obj1 = {name:"zfpx",age:9}
// let {name,age} = obj1;
// console.log(name,age); //zfpx 9

//把obj1的属性name和age 赋值给 myname和myage
//  let {name:myname,age:myage} = obj1;
//  console.log(myname,myage) //zfpx 9

// 默认解构 如果能取值来值就用取出来的值，如果取不出来就用默认值
let obj2 = {name:"zfpx",age:9};
let {name,age=8} = obj2;
console.log(name,age) //zfpx 8

//省略赋值
let arr4 = [1,2,3];
let [,,j] = arr4;






