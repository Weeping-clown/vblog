const mysql = require('mysql')
let connection = mysql.createConnection({
    host:'121.43.101.18',
    // host:'127.0.0.1',
    user:'db_user',
    password:'db_pass',
    database:'blog', //数据库名称
    dialectOptions: {
        socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
    }

})
connection.connect()
module.exports = connection