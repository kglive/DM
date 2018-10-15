/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/23
  * Time: 20:45
  * 
  */


const crypto = require('./module/crypto');

let miwen = crypto.encrypt('message');
console.log(miwen.toString());
let mingwen = crypto.decrypt(miwen);
console.log(mingwen);

/*
const myQuery = require('./module/mysql');

myQuery('select * from dm_teacher', (err, datd) => {
  console.log(err, datd);
});
*/