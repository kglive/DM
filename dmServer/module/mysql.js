
/*
	@ 数据库连接配置
	@ create by yk in 2018/9/17
*/

const mysql = require('mysql');
const { DB } = require('../config');


let dbp = mysql.createPool({
    host: DB.host,
    port: DB.port,
    user: DB.user,
    password: DB.password,
    database: DB.database,
    maxConnection: DB.maxConnection
});



function myQuery (sqlstatement, val, callback) {
    // 从创建的连接池中获取到一个我们需要的连接
    dbp.getConnection((err, connection) => {
        if (err) {
          callback && callback(err, null);
        } else {
            connection.query(sqlstatement, val, (err, data) => {
                callback && callback(err, data);
            });
        }
        // 必须释放连接池的连接，否则连接数一满，就会造成堵塞，连接超时
        connection.release();
    });
}

module.exports = myQuery;