var db = connect("school");
var start = Date.now();
for(var i = 0;i<1000;i++){
    db.students.insert({name:"zfpx3"+i,age:i})
}
print("cost"+(Date.now()-start)/1000 + "s");
