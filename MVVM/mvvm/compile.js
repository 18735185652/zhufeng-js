class Compile{
    /*el是根元素  vm是vue的实例*/
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el);
        this.vm = vm;
        if(this.el){
            //如果这个元素能获取到  我们才开始编译
            //1.先把这些真是的DOM移入到内存中  fragment
            let fragment = this.node2fragment(this.el);

            //2.编译 提取想要的元素节点 v-model 和文本节点 {{}}
            this.compile(fragment)

            //3.把编译好的fragment塞回到页面去
            this.el.appendChild(fragment);
        }
    }
    /*  专门写一些辅助方法 */
    isElementNode(node){
        return node.nodeType === 1;
    }
    //是不是指令
    isDirective(name){
        return name.includes("v-");
    }

    /* 核心的方法 */
    compileElement(node){
        //带v-model  v-text
        let attrs = node.attributes; //取出当前节点的属性
        // console.log(attrs);
        Array.from(attrs).forEach(attr=>{
            // console.log(attr.name)
            //判断属性名字是不是包含v-
            //attr.name 获取自定义属性的key value是值
            let attrName = attr.name;
            if(this.isDirective(attrName)){
                //取到对应的值放到节点中
                let expr = attr.value;
                //node this.vm.$data attr expr

                // let type = attr.name.slice(2)
                let [,type] = attr.name.split("-");//解构赋值
                CompileUtil[type](node,this.vm,expr);
            }
        })
    }
    compileText(node){
        //带{{}}
        let expr = node.textContent; //取文本中的内容
        console.log(expr)
        let reg = /\{\{([^}]+)\}\}/g; //{{a}} {{b}} {{c}}
        if(reg.test(expr)){

            //node this.vm.$data expr
            CompileUtil['text'](node,this.vm,expr);
        }
    }
    compile(fragment){
        //需要递归
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node=>{
            if(this.isElementNode(node)){
                //是元素节点 还需要继续深入的检查
                //这里需要编译元素
                // console.log("element",node);
                this.compileElement(node);
                this.compile(node);

            }else{
                //文本节点
                //这里需要编译文本
                // console.log("text",node)
                this.compileText(node);
            }
        })
    }
    node2fragment(el){ //需要将el中的内容全部放到内存中
        //文档碎片 内存中的dom节点
        let fragment = document.createDocumentFragment();
        let firstChile;
        while(firstChile = el.firstChild){
            fragment.appendChild(firstChile)
        }
        return fragment; //内存中的节点

    }


}
CompileUtil={
    getVal(vm,expr){ //获取实例上对应的数据
        expr = expr.split("."); //[a,v,c,s,a,w,r]
        return expr.reduce((prev,next)=>{ //vm.$data.a
            return prev[next];
        },vm.$data)
    },
    getTextVal(vm,expr){ //获取文本编译后的结果
        return expr.replace(/\{\{([^}]+)\}\}/g,(...arguments)=>{
            return  this.getVal(vm,arguments[1]);
        })
    },
    text(node,vm,expr){ //文本处理
        let updateFn = this.updater['textUpdater'];
        //{{message.a}} =>hello zfpx;
        let value = this.getTextVal(vm,expr)
        // console.log(value)
        //{{a}}  {{b}}
        expr.replace(/\{\{([^}]+)\}\}/g,(...arguments)=>{
            new Watcher(vm,arguments[1],(newValue)=>{
                //如果数据变化了  文本节点需要重新获取依赖的数据跟新文本中的内容
                updateFn && updateFn(node,this.getTextVal());
            })
        })



        //vm.$data[expr]; //message.a
        updateFn && updateFn(node,value);
    },
    model(node,vm,expr){ //输入框处理
        let updateFn = this.updater['modelUpdater'];
        //这里应该加一个监控 数据变化了 应该调用这个watch的callback
        new Watcher(vm,expr,()=>{
            //当值变化后 会调用cb 将新的值传递过来()
            updateFn&&updateFn(node,this.getVal(vm,expr));
        })
        updateFn&&updateFn(node,this.getVal(vm,expr));
    },
    updater:{
        //文本更新
        textUpdater(node,value){
            node.textContent = value;
        },
        //输入框更新
        modelUpdater(node,value){
            node.value = value;
        }
    }
}