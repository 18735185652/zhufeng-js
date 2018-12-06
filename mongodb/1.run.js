var command = {
    //要操作集合
    findAndModify:"students",
    //查询条件，指定操作的集合的范围
    query:{name:"zfpx2"},
    //指定如何更新
    update:{$inc:{age:100}},
    //指定返回的字段
    fields:{age:1,name:1,_id:0},
    sort:true,
    //new 为true，返回跟新后的文档，如果为false，返回跟新前的文档
    new:true

}
var db = connect("school");
var result = db.runCommand(command);
printjson(result);

