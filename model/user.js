const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'albx_38'
})
module.exports={
    getUserByEmail(email,callback){
        let sql=`select * from users where email='${email}' `;
        connection.query(sql,(err,results)=>{
            err && console.log(err);
            callback(results[0]);
        })
    }
}