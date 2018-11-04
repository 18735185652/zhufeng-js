//使用惰性思想(JS高阶编程技巧之一) 来封装我们的方法库：在第一次给我们的utils的时候就已经把兼容处理好了，把最后的结果存放在flag中
//以后再每一个方法中只要是IE6-8不兼容的，我们不需要重新检测，只需要flag的值即可
var utils =(function(){
    var flag = "getComputedStyle" in window;//flag这个变量不销毁，存储的是判断当前的浏览器是否兼容getComputedStyle，兼容
    // 的话就是标准浏览器，不兼容就是IE6-8

     //listToArray:实现将类数组转换为数组
     function listToArray(likeAry){
        if(flag){
            return Array.prototype.slice.call(likeAry);
        }
        var ary = [];
        for(var i=0;i<likeAry.length;i++){
            ary[ary.length]=likeAry[i]
        }
        return ary;
    }
    /* 对象深浅拷贝 */
    function copyDeep(obj,deep){
         var o = obj instanceof Array ? [] :{};
         for(key in obj){
             var val = obj[key];
             o[key] = (deep && typeof val === "object" ? copyDeep(val,deep) : val);
         }
         return o
    }

    //把JSON格式的字符串转换为json格式的对象
    // jsonParse:function(str){
    //     var val = null;
    //     try{
    //         val = JSON.parse(str)
    //     }catch(e){
    //         val = eval("("+str+")")
    //     }
    //     return val;
    // }
    function jsonParse(jsonStr){
        return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr+")");
    }
        //获取地址栏里拼接的参数
    function queryUrlParameter(str){
        var reg = /([^?=&]+)=([^?=&]+)/g;
        var res = reg.exec(str);
        var obj = {};
        while(res){
            obj[res[1]] = res[2];
            res = reg.exec(str);
        }
        return obj;
    }
    //万能时间格式化
    function myFormatTime(str){
        var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})$/g
        var ary = [];
        if(typeof str === "undefined"){
            return "第一个参数时间字符串不能为空";
        };
        str.replace(reg,function(){
            for(var i = 1;i <= 6;i++){
                var cur = Number(arguments[i]);
                cur = cur < 10 ? "0" + cur : cur;
                ary.push(cur);
            }
        });
        var format = arguments[1] || "{0}年{1}月{2}日 {3}时{4}分{5}秒";
        return format.replace(/{(\d+)}/g,function(){
            return ary[arguments[1]];
        });
    }
    // 字符串中出现字数最多的字母
    function strMax(str){
        var obj={};
        var reg = /[a-z]/g
        str.replace(reg,function(){
            val = arguments[0];
            obj[val] >= 1 ? obj[val]+=1 : obj[val] = 1;
        });
        var maxNum = 0;
        for(var key in obj){
            obj[key] > maxNum ? maxNum = obj[key] : null;
        }
        var ary = [];
        for(var key in obj){
            obj[key] === maxNum ? ary.push(key) : null
        }
        return "整个字符串当中出现次数最多的字符是："+ary.toString()+"，出现了"+maxNum+"次";
    }
    //设置cookie
    function setCookie(obj, time){
        time = new Date(Date.now() + (time ? time : 0) * 365*24*60*60*1000).toUTCString();
        for(var key in obj){
            document.cookie = key + "=" + obj[key] + ';expires=' + time;
        }
    }
    //获取cookie
    function getCookie(attr){
        var arr = document.cookie.match(new RegExp('\\b' + attr + '=([^;]+)(;|$)'));
        return arr ? arr[1] : "";
    }
    //移除cookie
    function removeCookie(attr){
        var obj = {};
        obj[attr] = "";
        setCookie(obj, -1)
    }
    //win:编写一个有关于操作浏览器盒子模型的方法
    function win(attr,value){
        if(typeof attr==="undefined"){
            return document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
    //获取当前元素所有经过浏览器计算过的样式中的attr对应的值
    function getCss(curEle,attr){
        var val = null,reg=null;
        if(flag){ //->返回的是true，说明window下有这个属性，代表兼容
            val = window.getComputedStyle(curEle,null)[attr];
        }else{ // IE 6-8
            //如果传递进来的是opacity，说明我想获取到的是透明度，但是在IE6-8下获取透明度需要使用filter
            if(attr === "opacity"){
                val = curEle.currentStyle["filter"]; /* alpha(opacity=10) 把获取到的结果进行剖析，获取里面的数字，让数字除以100才和标准浏览器保持一致*/
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                val = reg.test(val) ? reg.exec(val)[1]/100:1;
            }else{
                val = curEle.currentStyle[attr];
            }
        }
        reg = /^-?\d+(\.\d+)?(px|pt|rem|em)?$/i;
        return reg.test(val) ? parseFloat(val) : val; //这样写肯定不行，对于某些样式属性的值是不能去单位的，例如:float,position,margin,padding,border这些，backgroundColor...
    }
    //获取当前元素下所有元素节点,如果多传递一个标签名的话，我们还要在获取的元素集合中把对应标签名的进行二次筛选
    function children(curEle,tagName){
    var ary = [];
    /* IE6-8不能使用内置的children属性，我们自己代码实现 */
    if(!flag){
        var nodeList = curEle.childNodes;
        for(var i=0,len=nodeList.length;i<len;i++){
            var curNode = nodeList[i];
            if(curNode.nodeType ===1){
                ary[ary.length] = curNode;
            }
        }
    }else{
        //->标准浏览器，我们直接使用children即可，但是这样获取的是一个类数组集合，为了和IE6-8
        //下保持一致，我们借用数组原型上的slice，把类数组转化为数组
        ary = Array.prototype.slice.call(curEle.children);
    }
    //二次筛选
    if(typeof tagName === "string"){
        for(var k = 0; k < ary.length;k++){
            var curEleNode = ary[k];
            if(curEleNode.nodeName.toLowerCase()!==tagName.toLowerCase()){
                //不是我想要的那个标签
                ary.splice(k,1);
                k--;
            }
        }
    }
    return ary;
    }

    //prev 获取上一个哥哥元素节点
    //->首先获取当前元素的上一个哥哥节点，判断是否为元素节点，不是的话基于当前的继续找上门的哥哥节点。。。
    //一直到找到哥哥元素节点为止，如果没有返回null即可
    function prev(curEle){
        if(flag){
            return curEle.previousElementSibling;          
        }
        var pre = curEle.previousSibling;
        console.log(pre)
        while(pre&&pre.nodeType!==1){ //不等于1说明不是元素节点
            pre =pre.previousSibling ;
        }
        // return pre;
    }

    //获取下一个弟弟元素节点
    function next(curEle){
        if(flag){
            console.log(curEle.nextSibling)
            return curEle.nextElementSibling;     
        }
         var nex = curEle.nextSibling;
         
         if(nex && nex.nodeType !== 1){
            nex = curEle.nextiousSibling;
         }
         return nex;
    }
    //prevAll:获取所有的哥哥元素节点
    function prevAll(curEle){
        var ary = [];
        var pre = this.prev(curEle);
        while(pre){
            ary.unshift(pre);//放在开头
            pre = this.prev(pre);
        }
        return ary;
    }
    //nextAll获取所有的弟弟元素节点
    function nextAll(curEle){
        var ary = [];
        var nex = this.next(curEle);
        while(nex){
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    //silbing:获取相邻的两个元素节点
    function sibling(curEle){
        var ary=[];
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        pre?ary.push(pre):null;
        nex?ary.push(nex):null;
        return ary
    }
    //siblings:获取所有的兄弟元素节点
    function siblings(curEle){
        return this.prevAll(curEle).concat(this.nextAll(curEle));
    }
    //index 获取当前元素索引
    function index(curEle){
        return this.prevAll(curEle).length;
    }

    //firstChild 获取第一个元素子节点
    function firstChild(curEle){
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[0] : null;
    }

     //lastChild 获取最后一个元素子节点
     function lastChild(curEle){
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[chs.length-1] : null;
    }


    function jsonp({url,params,cb}){
        return new Promise((resolve,reject)=>{
            window[cb] = function(data){
                resolve(data);
                document.body.removeChild(script)
            }
            params = {...params,cb}
            let arr = [];
            for(let key in params){
                // arr.push(`${key}=${params[key]}`)
                arr.push(""+key+"="+params[key]+"")
            }
            let script = document.createElement("script");
            // script.src = `${url}?${arr.join("&")}`;
            script.src = ""+url+"?"+arr.join("&")+""
            document.body.appendChild(script);
        })

    }

    function jsonp(url,params,cb){
         return new Promise(resolve,reject){
             window[cb] = function(data){
                 resolve(data);
             }
             var arr = [];
             params = {...params,cb};
             for(key in params){
                 arr.push(""+key+"="+params[key]+"");
             }
             var script = document.createElement("script");
             script.src = ""+url+"?"+arr.join("&")+""
             document.body.appendChild(script);
        }
    }
    // jsonp({
    //     url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
    //     params:{
    //         wd:"a"
    //     },
    //     cb:"show"
    // }).then(data=>{
    //     console.log(data)
    // })


    return  {
        listToArray:listToArray,
        jsonParse:jsonParse,
        queryUrlParameter:queryUrlParameter,
        myFormatTime:myFormatTime,
        strMax:strMax,
        getCookie:getCookie,
        setCookie:setCookie,
        removeCookie:removeCookie,
        win:win,
        getCss:getCss,
        children:children,
        prev:prev,
        next:next,
        prevAll:prevAll,
        nextAll:nextAll,
        sibling:sibling,
        siblings:siblings,
        index:index,
        firstChild:firstChild,
        lastChild:lastChild,
        copyDeep:copyDeep
    }




})();