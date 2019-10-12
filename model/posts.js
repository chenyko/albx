const {connection}=require('./sqlhelper')


module.exports={
    getAllPosts(callback){
        let sql= `SELECT
        posts.id,posts.title,posts.created,posts.\`status\`,
        categories.\`name\`,
        users.nickname
       FROM posts
      LEFT JOIN categories ON posts.category_id = categories.id
      LEFT JOIN users ON posts.user_id = users.id`;
      connection.query(sql,(err,result)=>{
          err&&console.log(err);
          callback(result);
      })
    },
    getPostsByPage(pageInde,pageSize,callback){
        let sql=`SELECT
        posts.id,posts.title,posts.created,posts.\`status\`,
        categories.\`name\`,
        users.nickname
       FROM posts
      LEFT JOIN categories ON posts.category_id = categories.id
      LEFT JOIN users ON posts.user_id = users.id
      LIMIT ${(pageInde-1)*pageSize},${pageSize}`;
      connection.query(sql,(err,result)=>{
        err&&console.log(err);
        callback(result);
    })
    },
    // 获取文章一共有多少条的方法
    getPostCount(callback){
        let sql=`SELECT count(id) as total FROM posts`;
        connection.query(sql,(err,result)=>{
            err && console.log(err);
            callback(result[0])
        })
    }

}