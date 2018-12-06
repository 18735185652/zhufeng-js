/*
* 以前的JS只需要处理字符
* 如何实现进制的转换
*
* */
let a = 0b10010;  //二进制
console.log(a); //18
let b = 0o24; //八进制
console.log(b);  //20

let c = 20; //十进制
let d = 0x14; //十六
console.log(d); //十六进制  //20

//如何把任意进制转换成十进制
console.log(parseInt(d,10))

//如何把任意十进制转成任意进制
console.log(c.toString(2)); // 10100

//如何把八进制  准换成十六进制


