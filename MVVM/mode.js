//发布 订阅模式  订阅 再有发布  [fn1,fn2,fn3]

function Dep(){
    this.subs = [];
}
Dep.prototype.addSub = function(sub){  //订阅
    this.subs.push(sub)
}
Dep.prototype.notify = function(sub){ //通知
    this.subs.forEach(sub=>sub.update());
}

function Watcher(fn){
    this.fn = fn;
}

Watcher.prototype.update = function(){
    this.fn();
}
let watcher = new Watcher(function(){ //监听函数
    console.log(1);
});

let dep = new Dep();
dep.addSub(watcher); //将watcher放到了数组中[watcher.update]
dep.addSub(watcher);
// console.log(dep.subs)
dep.notify();  //数组关系