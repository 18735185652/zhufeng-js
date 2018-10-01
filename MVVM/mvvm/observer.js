class Observer{
    constructor(data){ // data:1
        this.observe(data);
    }
    /* 要对这个data数据将原有的属性改成get和set的形式 */
    observe(data){
        if(!data || typeof data !== "object"){
           return;
       }
       //要将数据  一一劫持 先获取到data的key和value
        Object.keys(data).forEach(key=>{
            //劫持
            this.defineReactive(data,key,data[key]);
            this.observe(data[key]); //深度递归劫持
        })
    }
    /* 定义响应式 */
    defineReactive(obj,key,value){
        let that = this;
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){ //取值的时候调用的方法
                return value;
            },
            set(newValue){ //当给data属性中设置值得时候  更改获取属性的值
                if(newValue!=value){
                    //这里的this不是实例
                    that.observe(newValue);/* 如果是对象 继续劫持 */
                    value = newValue;

                }
            },
        })
    }


















}