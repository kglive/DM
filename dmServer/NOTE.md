## 学习笔记，开发问题记录

---
> 什么情况不能使用箭头函数？
>>

---
> 前端请求数一多，后台就会堵塞，造成网络请求超时？
>> 必须释放连接池的连接，否则连接数一满，就会造成堵塞，连接超时
```
    const mysql = require('mysql');
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
```
