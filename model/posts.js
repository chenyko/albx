const { connection } = require('./sqlhelper')


module.exports = {
    getAllPosts(callback) {
        let sql = `SELECT
        posts.id,posts.title,posts.created,posts.\`status\`,
        categories.\`name\`,
        users.nickname
       FROM posts
      LEFT JOIN categories ON posts.category_id = categories.id
      LEFT JOIN users ON posts.user_id = users.id`;
        connection.query(sql, (err, result) => {
            err && console.log(err);
            callback(result);
        })
    },
    getPostsByPage(pageInde, pageSize, callback) {
        let sql = `SELECT
        posts.id,posts.title,posts.created,posts.\`status\`,
        categories.\`name\`,
        users.nickname
       FROM posts
      LEFT JOIN categories ON posts.category_id = categories.id
      LEFT JOIN users ON posts.user_id = users.id
      LIMIT ${(pageInde - 1) * pageSize},${pageSize}`;
        connection.query(sql, (err, result) => {
            err && console.log(err);
            callback(result);
        })
    },
    // 获取文章一共有多少条的方法
    getPostCount(callback) {
        let sql = `SELECT count(id) as total FROM posts`;
        connection.query(sql, (err, result) => {
            err && console.log(err);
            callback(result[0])
        })
    },
    // 根据条件筛选总条数
    getPostCountByFilter(condition, callback) {
        let sql = `SELECT count(id) as total FROM posts `;
        if (condition !== undefined) {
            sql += condition
        }
        connection.query(sql, (err, result) => {
            err && console.log(err);
            callback(result[0]);
        })
    },
    // 根据筛选条件获取文章
    // getPostsByFilter(category_id,status,callback){ // 这个是我们一开始的版本，了解筛选需要的条件即可
    getPostsByFilter(sql, callback) { // 这个是我们的新版本，只需要传递一个sql语句过来就行
        connection.query(sql, (err, result) => {
            err && console.log(err);
            callback(result);
        })
    },

    //   新增一篇文章
    addNewPost(data, callback) {
        let sql = `INSERT INTO posts
     SET title='${data.title}',content='${data.content}',slug='${data.slug}',
     feature='${data.feature}',category_id=${data.category},
     created='${data.created}',\`status\`='${data.status}',
     user_id=${data.user_id}`;
        connection.query(sql, (err, result) => {
            err && console.log(err);
            callback(result);
        })
    },

    // 删除一篇文章-物理删除（真正的删除）
    deletePostById(id,callback){
        let sql=`delete from posts where id = ${id}`;
        connection.query(sql, (err, result) => {
            err && console.log(err);
            callback(result);
        })
    },

    // 根据一个id获取旧数据
    getPostsById(id,callback){
        let sql = `select * from posts where id = ${id}`;
        connection.query(sql,(err,result)=>{
          err && console.log(err);
          callback(result[0]);
        })
      },

    // 根据id修改
    editPostById(data,callback){
        let sql = `update posts
        SET title='${data.title}',content='${data.content}',slug='${data.slug}',
        feature='${data.feature}',category_id=${data.category},
        created='${data.created}',\`status\`='${data.status}',
        user_id=${data.user_id} where id = ${data.id}`;
        // console.log(sql);
        connection.query(sql,(err,result)=>{
          err && console.log(err);
          callback(result);
        });
    },

    // 批量删除
    deletePostByMutiple(ids,callback){
        let idsStr = ids.join();
        let sql = `DELETE FROM posts WHERE id in (${idsStr})`;
        connection.query(sql,(err,result)=>{
          err && console.log(err);
          callback(result);
        })
      }
}