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
    },
    // 根据条件筛选总条数
     getPostCountByFilter(condition,callback){
    let sql = `SELECT count(id) as total FROM posts `;
    if(condition !== undefined){
      sql += condition
    }
    connection.query(sql,(err,result)=>{
      err && console.log(err);
      callback(result[0]);
    })
  },
  // 根据筛选条件获取文章
  // getPostsByFilter(category_id,status,callback){ // 这个是我们一开始的版本，了解筛选需要的条件即可
  getPostsByFilter(sql,callback){ // 这个是我们的新版本，只需要传递一个sql语句过来就行
    connection.query(sql,(err,result)=>{
      err && console.log(err);
      callback(result);
    })
  }

}