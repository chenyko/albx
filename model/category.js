// 负责操作分类相关的数据
const { connection } = require('./sqlhelper');
module.exports = {
    // 展示所以的数据
    getAllCategory(callback) {
        let sql = `SELECT * FROM categories`;
        connection.query(sql, (err, result) => {
            err && console.log(sql);
            callback(result)
        })
    },
    //   新增一条数据的方法
    addNewCategory(slug,name,classname,callback){
        let sql = `insert into categories set slug='${slug}',\`name\`='${name}',classname='${classname}'`;
        connection.query(sql,(err,result)=>{
            err &&  console.log(err);
            callback(result)
        })
    },
    getCategoryById(id,callback){
        let sql= `select * from categories where id=${id}`;
        connection.query(sql,(err,result)=>{
            err && console.log(err);
            console.log(result);
            
            callback(result[0]);
        })
    }
}