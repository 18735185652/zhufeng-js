/*
* Promise是一个类，可以创建实例
*代表承诺,什么时候回用到承诺，一般是异步任务，就是需要很长时间执行的任务
*
* */
let Promise1 = require("./Promise");

let p1 = new Promise1(function(resolve,reject){
    //pending
    // resolve(10000000)
   setTimeout(function(){
        let num = Math.random();//生成一个随机数
         console.log(num);
        if(num>.5){
            //如果这个Promise成功了,会调用成功的回调 fulfilled
            resolve("大成功")
        }else {
            reject("小失败") //rejected
        }
    },200)
});
//成功回调后的值会被用来resolve当前的Promise
//成功的回调里又返回了一个新的promise
//成功的回调里返回的promise还不是我自己写的promise
//如果成功的回调里返回了一个promise，那么promise2要以promise的
//resolve结果来resolve自己
let p2 = p1.then(function(data){
    return new Promise(function(reslove,reject){
        setTimeout(function(){
            reslove(data+100)
        },1000)
    })
})

p2.then(function(data){
    console.log("成功",data);
},function(reason){
    console.log("失败",reason);
})