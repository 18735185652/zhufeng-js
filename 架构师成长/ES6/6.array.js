let arr1 = [24,56,88,90,5];
//filter过滤 返回true此元素保留在新数组，返回false则删除
let arr2 = arr1.filter(function(item,index){
    return item>=60;
});

//实现原理
Array.prototype.filter=function(fn){
    let newArr = [];
    for(let i=0;i<this.length;i++){
        let flag = fn(this[i]);
        flag&&newArr.push(this[i]);
    }
    return newArr
}


//map reduce reducerRight filter forEach
//some find findIndex every

// let arr3 = Array(3);
// arr3.fill(1)
// console.log(arr3); //[ 1, 1, 1 ]

//find原理
Array.prototype.find = function(fn){
    for(let i=0;i<this.length;i++){
      let flag = fn(this[i]);
      if(flag){
          return this[i];
      }
    }
}

let arr4 = [1,2,3]
let result = arr4.find(function(item){
    return item==2;
})
console.log(result);



Array.prototype.find = function(fn){
    for(let i=0;i<this.length;i++){
        let flag = fn(this[i]);
        if(flag){
            return i;
        }
    }
}
let result = arr4.findIndex(function(item){
    return item==2;
})



//some 有一个条件符合就返回true
Array.prototype.some = function(fn){
    for(let i=0;i<this.length;i++){
        let flag = fn(this[i]);
        return flag?true:false;
    }
}


// every 要求每一个元素都要符合条件
Array.prototype.some = function(fn){
    let flag = true;
    for(let i=0;i<this.length;i++){
        let flag = fn(this[i]);
        if(!flag){
           return false;
        }
    }
    return flag;
}

//把一个类数组转换为数组
Array.form()

//不常用
// Array.of(3)



