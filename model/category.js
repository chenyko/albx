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
   
    // 删除一条数据的方法
    deleteCategoryById(id,callback){
        let sql=`UPDATE categories set isDelete = 1 WHERE id=${id}`;
        connection.query(sql,(err,result)=>{
            err && console.log(err);
            callback(result)
        })
    },
    
    // 获取一条数据的方法
     getCategoryById(id,callback){
        let sql= `select * from categories where id=${id}`;
        connection.query(sql,(err,result)=>{
            err && console.log(err);
            console.log(result);
            
            callback(result[0]);
        })
    },

    // 修改分类的方法
    editCateogryById(id,name,slug,classname,callback){
        let sql = `UPDATE categories set \`name\`='${name}',slug='${slug}',classname='${classname}' WHERE id=${id}`;
        connection.query(sql,(err,result)=>{
          err && console.log(err);
          callback(result);
        })
      }

}