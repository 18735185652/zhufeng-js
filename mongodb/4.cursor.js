var db = connect("school");
var cursor = db.students.find();
// while(cursor.hasNext()){
//     var recod = cursor.next();
//     printjson(recod);
// }

//cursor 游标
cursor.forEach(function(item){printjson(item)})
