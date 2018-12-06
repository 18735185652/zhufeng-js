/*
* 函数
* */
//1 默认参数  1.必填项不填报错  2.有些参数没有给传参的话可以有默认值
// function ajax(url,method,dataType){
//     console.log(url);
//     console.log(method);
//     console.log(dataType);
//     if(typeof url == "undefined") throw Error("url不能为空");
//     method = method ? method : "GET";
//
// }
// function ajax(url = new Error("url不能为空"),method="GET",dataType="json"){
//     console.log(url);
//     console.log(method);
//     console.log(dataType);
// }
// ajax("/user","POST");


//编译es5后
// "use strict";
// function ajax() {
//     var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Error("url不能为空");
//     var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
//     var dataType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "json";
//     console.log(url);
//     console.log(method);
//     console.log(dataType);
// }
// ajax("/user", "POST");


function sum(prefix,...rest){
    //rest = [1,2,3,4]
    //1.循环求和
    //let result = 0;
    //循环数组中的每个元素，把他们依次传入对应的函数
    //rest.forEach(function(item){
     //   result += item;
    //})
   // return prefix+(result);

    //reduce 计算 汇总 收敛 把一个数组中的一堆值计算出来一个值


}
console.log("$",1,2)

let arr4 = [1,2,3];
//可以传一个参数，也可以传二个参数
//第二个参数表示初始值
//上一次的执行结果会成为下一次的初始值
//平均值
//如果没有初始值得话，第一次函数执行的时候 val = 第一个元素 item = 第二个元素
//reduce从左往右算

// let result = arr4.reduce(function(val,item,index,origin){
//     let sum = val +item; //返回值会成为下一次函数执行的val
//     if(index==arr4.length-1){
//         return sum/arr4.length
//     }else{
//         return sum;
//     }
// },0);
//
// console.log(result);


//reduce 原理
// Array.prototype.reduces=function(reducer,init){
//     for(let i =0;i<this.length;i++){
//         init = reducer(init,this[i]);
//     }
//     return init
// }
//
// let result = arr4.reduces(function(val,item){
//     return val+item;
// },0)
// console.log(result);


//展开运算符
// let arr5 = [1,2,3];
// let arr6 = [4,5,6];
//let arr7 = [].concat(arr5,arr6) //[ 1, 2, 3, 4, 5, 6 ]
// let arr7 = [...arr5,...arr6]
// console.log(arr7);

//es5
// let max = Math.max.apply(null,arr5)
//es6
// let max = Math.max(...arr5);
// console.log(max);




// let obj1 = {name:"1"};
// let obj2 = {age:2}
// let obj3 = {};
//1.循环赋值
//  for(let key in obj1){
//      obj3[key] = obj1[key]
//  }
// for(let key in obj2){
//     obj3[key] = obj2[key]
// }

//2. assign
// 1 参数都是target 后面都是来源对象
// Object.assign(obj3,obj1,obj2);


//3. 对象的解构
// obj3 = {...obj1,...obj2};
// console.log(obj3);


//深度拷贝
let obj5 = {name:"zfpx",home:{
    city:"北京"
    }
}
let obj6 = {};
// obj6 = Object.assign(obj6,obj5);
// obj6.home.city = "广州"
// console.log(obj5)  //{ name: 'zfpx', home: { city: '广州' } }

//实现深浅拷贝
// let obj6 = JSON.parse(JSON.stringify(obj5))
// // console.log(obj5);
// // console.log(obj6);

function clone(origin){
    let newObj = {}
    for(let key in origin){
        if(typeof origin[key]==="object"){
            newObj[key] = clone(origin[key]);
        }else{
            newObj[key] = origin[key]
        }
    }
    return newObj;
}

let obj7 = clone(obj5);
obj7.home.city = "广州"
console.log(obj5,obj7);


