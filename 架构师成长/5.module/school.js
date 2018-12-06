//此变量属于私有变量
let name = "zfpx";
let age = 9;

/**
 * 这个模块是如何执行的
 * 1.
 *
 */

module.exports = {
    name,
    age
}
//dirname取得当前模块文件的所有的目录的绝对路径
//当前模块的导出对象 require方法 当前模块  当前文件的绝对路径  当前文件夹的绝对路径
//var args = [this.exports,require,this,filename,dirname]
// 在模块内部 this.exports 等于当前模块的导出对象，就等于this

