var utils = {
    //listToArray:实现将类数组转换为数组
    listToArray:function(likeAry){
        var ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length]=likeAry[i]
            }
        }
        return ary;
    },
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
    jsonParse: function (jsonStr){
        return 'JSON' in window ? JSON.parse(jsonStr) : eval("(" + jsonStr+")");
    },
    //获取地址栏里拼接的参数
    queryUrlParameter:function(str){
        var reg = /([^?=&]+)=([^?=&]+)/g;
        var res = reg.exec(str);
        var obj = {};
        while(res){
            obj[res[1]] = res[2];
            res = reg.exec(str);
        }
        return obj;
    },
    //万能时间格式化
    myFormatTime:function(str){
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
    },
    // 字符串中出现字数最多的字母
    strMax:function(str){
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
    },
    //设置cookie
    setCookie: function(obj, time){
        time = new Date(Date.now() + (time ? time : 0) * 365*24*60*60*1000).toUTCString();
        for(var key in obj){
            document.cookie = key + "=" + obj[key] + ';expires=' + time;
        }
    },
    //获取cookie
    getCookie:function(attr){
        var arr = document.cookie.match(new RegExp('\\b' + attr + '=([^;]+)(;|$)'));
        return arr ? arr[1] : "";
    },
    //移除cookie
    removeCookie:function(attr){
        var obj = {};
        obj[attr] = "";
        setCookie(obj, -1)
    },
    //win:编写一个有关于操作浏览器盒子模型的方法
    win:function(attr,value){
        if(typeof attr==="undefined"){
           return document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    },
    //获取当前元素所有经过浏览器计算过的样式中的attr对应的值
    getCss:function (curEle,attr){
        var val = null,reg=null;
        if("getComputedStyle" in window){ //->返回的是true，说明window下有这个属性，代表兼容
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











}