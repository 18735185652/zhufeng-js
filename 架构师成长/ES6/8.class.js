//定义一个类
/**
 * 以前JS里类和构造函数是一体的
 * 类里面可以定义构造函数,当你创建一个类的实例的时候就会调用构造函数
 */


class Parent{
    constructor(name){
        this.name = name;
    }
    //
    getName(){
        console.log(this.name);
    }
}

let p = new Parent("zfpx");
p.getName()