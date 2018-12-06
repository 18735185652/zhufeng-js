let repl = require('repl');
let con = repl.start().context;
con.msg = 'hello';
con.hello = function(){
    console.log(con.msg);
}
