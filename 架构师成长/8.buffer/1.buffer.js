//表示分配 一个长度为6个字节的Buffer
//会把所有的字节设置为0
//可以提供默认值
let buf1 = Buffer.alloc(6,2)
console.log(buf1); //<Buffer 02 02 02 02 02 02>

//分配一块没有初始化的内存
let buf2 = Buffer.allocUnsafe(6);
console.log(buf2);

let buf3 = Buffer.from("珠峰");
console.log(buf3);

let buf4 = Buffer.alloc(6);
console.log(buf4); //<Buffer 00 00 00 00>
// 1填充的值 2 填充开始的索引 3 结束索引，不包含结束
// buf4.fill(3,1,3)
// console.log(buf4); //<Buffer 00 03 03 00>


//1.写的字符串  2.填充的开始索引 3.填充的字节长度 4.编码
// buf4.write("珠峰",0,3,"utf8");
//
// console.log(buf4);
// buf4.write("峰",3,3,"utf8");
//
// console.log(buf4);
// console.log(buf4.toString());


let buf5 = Buffer.alloc(6);
// 向指定的索引写入一个8位的整数，也就是说占用一个字节的整数
buf5.writeInt8(0,0);

buf5.writeInt8(16,1);

buf5.writeInt8(32,2);
console.log(buf5);  //<Buffer 00 10 20 00 00 00>

let buf5 = Buffer.alloc(4);












