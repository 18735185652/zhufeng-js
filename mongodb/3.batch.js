var db = connect("school");
var stus = [];
var start = Date.now();
for(var i = 1;i<=10;i++){
    stus.push({name:"zfpx"+i,age:i});
    // db.students.insert({name:"zfpx3"+i,age:i})
}
db.students.insert(stus)
print("cost"+(Date.now()-start)/1000 + "s");
