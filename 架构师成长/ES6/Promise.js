
//构造函数的参数是一个异步任务
function Promise(task){
    let that = this;//缓存this
    that.status = "pending"; //默认状态为pending
    that.value = undefined; //Promise的结果
    //存放的这所有成功的回调函数
    that.onResolvedCallbacks = []
    //调用此方法可以把promise变成成功态
    that.onRejectedCallbacks = [];
    //调用此方法可以把promise变成失败态
    function resolve(value){
        if(that.status==="pending"){
            that.status="fulfilled";
            that.value = value;
            that.onResolvedCallbacks.forEach(item=>item(that.value));
        }
    }
    //调用此方法可以把promise变成失败态
    function reject(reason){
        //如果当前状态是初始态 则转成失败态
        if(that.status==="pending"){
            that.status="rejected";
            that.value = reason;
            that.onRejectedCallbacks.forEach(item=>item(that.value));

        }

    }
    //立刻执行传入的任务
    try{
        task(resolve,reject);
    }catch (e) {
        reject(e);
    }

}
function resolvePromise(promise2,x,resolve,reject){
    //如果x就是promise2 死循环
    if(promise2 === x){
        return reject(new TypeError("循环引用"))
    }
    if(x instanceof Promise){
        if(x.status == "pending"){
            x.then(function(y){
                resolvePromise(promise2,y,resolve,reject)
            },reject);
        }else if(x.status=="fulfilled"){
            resolve(x.value)
        }else if(x.status=="rejected"){
            reject(x.value)
        }
    }else if(x!=null&&(typeof x=="object" || typeof x=="function")){
        try{
            then = x.then;
            if(typeof then === "function"){
                then.call(x);
            }
        }catch (e) {
            reject(e);
        }
    }
}

//onFullfilled成功回调，onReject失败回调
    Promise.prototype.then=function(onFullfilled,onReject){
    let that = this;
    let promise2;
    if(that.status === "fulfilled"){
        promise2 = new Promise(function(resolve,reject){
            resolvePromise(promise2,x,resolve,reject)
            let x = onFullfilled(that.value);
        })

    }
    if(that.status === "rejected"){
        onReject(that.value);
    }
    if(that.status === "pending"){
        that.onResolvedCallbacks.push(onFullfilled);
        that.onRejectedCallbacks.push(onReject);
    }


}

module.exports = Promise;