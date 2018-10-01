var utils = {
    /* listToArray:类数组转换为数组 */
    listToArray:function(likeAry){
        var ary = [];
        try{
            ary = Array.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }
};