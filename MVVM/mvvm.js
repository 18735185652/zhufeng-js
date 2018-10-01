function Zhufeng(options = {}){
    this.$options = options; //将所有属性挂载在了$options
    var data = this._data = this.$options.data;
    observe(data);
    //this代理了  this.__data
    for(let key in data){
        Object.defineProperty(this,key,{
            enumerable:true,
            get(){
                return this._data[key]
            },
            set(newVal){
                this._data[key] = newVal
            }
        })
    }
    new Compile(options.el,this)
}
//模板编译
function Compile(el,vm){
    // el 表示替换的范围
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    while(child = vm.$el.firstChild){  //将app的内容 移入到内存中
        console.log(child);
        fragment.appendChild(child);
    }
    replace(fragment);
    function replace(fragment){
        Array.from(fragment.childNodes).forEach(function(node){ //循环每一层
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if(node.nodeType === 3 &&reg.test(text)){
                // console.log(RegExp.$1); //a.a
                let arr = RegExp.$1.split("."); //[a,a]
                let val = vm;    //arr = [a,a,a]
                arr.forEach(function(k){ //取this.a.a this.b
                    val = val[k];
                    console.log(val)
                })
                node.textContent = text.replace(/\{\{(.*)\}\}/,val)
            }
            if(node.nodeType === 1){
                //元素节点
                let nodeAttrs = node.attributes; //获取当前dom的所有属性
                Array.from(nodeAttrs).forEach(function(attr){
                    console.log(attr.name)
                    let name = attr.name; //type = "text"
                    let exp =attr.value;  //v-model = "b"
                    if(name.indexOf("v-")==0){
                        node.value = vm[exp];
                    }
                    new Watcher(vm,exp,function(newVal){
                        node.value = newVal; //Watcher触发时候，会自动将内容放到输入框内
                    })
                    node.addEventListener("input",function(e){
                        let newVal = e.target.value;
                        vm[exp] = newVal;
                    })
                })
            }
            if(node.childNodes){
                replace(node);
            }
        })
    }

    vm.$el.appendChild(fragment);
}
//vm.$options
//观察对象给对象增加Object.defineProperty
function Observe(data){//这里写我们的主要逻辑
    for(let key in data){ //把data属性通过Object.defineProperty的方式定义属性
       let val = data[key];
       observe(val)
        Object.defineProperty(data,key,{
            enumerable:true, //可枚举
            get(){
                return val;
            },
            set(newVal){ //更改值得时候
                if(newVal === val){ //设置的值和以前是一样的东西，忽略
                    return;
                }
                val = newVal; //如果以后再获取值得时候，将刚才设置的值在丢回去
                observe(newVal)
            }
        })
    }
}
function observe(data){
    if(typeof data !=="object")return
    return new Observe(data)
}


//vue 特点 不能新增不存在的属性 不能存在的属性没有get和set方法
//深度响应 因为每次赋予一个新对象时会给这个新对象增加数据劫持


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
