
//fs核心模块来读写文件
 //    r	读文件，文件不存在报错
 //    r+	读取并写入，文件不存在报错
 //    rs	同步读取文件并忽略缓存
 //    w	写入文件，不存在则创建，存在则清空
 //    wx	排它写入文件
 //    w+	读取并写入文件，不存在则创建，存在则清空
 //    wx+	和w+类似，排他方式打开
 //    a	追加写入
 //    ax	与a类似，排他方式写入
 //    a+	读取并追加写入，不存在则创建
 //   ax+	作用与a+类似，但是以排他方式打开文件


let fs = require("fs");
//flag将要对文件进行何种操作  w写入文件
// fs.readFile("./1.txt",{encoding:"utf8",flag:"w"},function(err,data){
//     if(err){
//         console.error(err)
//     }else{
//         console.log(data)
//     }
// })

// flag a 追加写入  w清空并写入
// 666 nginx
// fs.writeFile("./2.txt","data",{encoding:"utf8",flag:"w",mode:0o666},function(err){
//     console.log(err);
// })

// fs.appendFile("./2.txt","data",function(err){
//     console.log(err);
// })

//他们都是把文件当成一个整体来操作
//当文件特别大的，大于内存的是无法执行操作的
//我们需要精确的控制读取的字节
//file dispcriptor文件描述符
fs.open("./1.txt","r",0o666,function(err,fd){
    console.log(fd);
})