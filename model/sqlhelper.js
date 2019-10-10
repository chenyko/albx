const mysql = require('mysql');

const connection = mysql.createConnection({
  host : '127.0.0.1',
  user : 'root',
  password : 'root',
  database : 'albx_38'
});

module.exports = { connection }
