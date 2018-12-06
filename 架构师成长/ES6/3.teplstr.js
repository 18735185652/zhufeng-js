let name = "zfpx",age=9;
// let desc = name+"今年"+age+"岁了";
// console.log(desc); //zfpx今年9岁了

//1.字符串里可以嵌套变量
//2.模板语言很多就是这样的原理
// let desc = "${name}今年${age}岁了";

// function replace(desc){
//    return desc.replace(/\$\{([^}]+)\}/g,function(matched,key){
//        console.log(arguments);
//        return eval(key)
//     });
// }
//
//
// console.log(replace(desc)); //zfpx今年9岁了

//模板字符串
//模板字符串可以折行  换行

let users = [{id:1,name:"zfpx1"},{id:2,name:"zfpx2"}];
/*
* <ul>
*     <li>1:zfpx1</li>
* </ul>
*
*
* */
//映射 把老数组里的每一个元素映射为新数组的每一个元素
// let newLis = users.map(function(user,index){
//     return ` <li>${user.id},${user.name}</li> `
// }).join("");
// console.log(newLis);

//带标签的模板字符串
// function desc(strings,name,age){
//     console.log(arguments) //{ '0': [ '', '今年', '岁了' ], '1': 'zfpx', '2': 9 }
//     console.log(strings); //[ '', '今年', '岁了' ]
//     console.log(name); //zfpx
//     console.log(age); //9
// }
// //相当于desc执行返回的结果 第一个参数为整体 ，第二个为变量... str 就等于函数返回的值
// let str = desc`${name}今年${age}岁了`


//其他运算符 会把后面所有参数全部放在一个数组里
// rest其他运算符只能作为最后一个参数;
 //因为有些时候我们希望有自己的拼接模板字符串逻辑
function desc(strings,...values){
    console.log(strings); //[ '', '今年', '岁了' ]
    console.log(values); //[ 'zfpx', 9 ]

    let result = "";
    for(let i = 0;i<values.length;i++){
        result+=(strings[i]+values[i]);
    }
    result+=strings[strings.length-1];
    return result.toLocaleUpperCase()
}
//相当于desc执行返回的结果 第一个参数为整体 ，第二个为变量...
let str = desc`${name}今年${age}岁了`;

console.log(str); //ZFPX今年9岁了

// 判断一个字符串是否以指定的字符串开头 startsWith
let address1 = "https://www.baidu.com";
let address2 = "ftp://www.baidu.com";
if(address1.startsWith("http")){
    console.log("http服务器");
}else if(address2.startsWith("ftp")){
    console.log("ftp服务器");
}

//判断字符串中是否以指定字符串结尾
let filename = "avatar.jpg";
if(filename.endsWith("jpg")||filename.endsWith("png") ){
    console.log("这是一张图片")
}

//判断一个字符串是否包含另外一个字符串
let content = "abc";
console.log(content.includes("b")); //es6
console.log(content.indexOf()!=-1);//es5

//repeat返回一个新字符串，表示将原字符串重复n次
let x = "xx";
console.log(x.repeat(3));

