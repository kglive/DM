/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/6
  * Time: 19:19
  * counsellor 辅导员表 模型 表操作方法集
  */

const myQuery = require('../module/mysql');
const crypto = require('../module/crypto');


const CounsellorModel = {
  /*
  * 添加辅导员
  * params {
  *   name: '',
  *   password: '',
  *   sex: '',
  *   code: '',
  *   description: ''
  * }
  * return Promise(Boolean(true))
  * */
  addCounsellor (params) {
    return new Promise((resolve, reject) => {
      let ciphertext = crypto.encrypt(params.password).toString();
      let createtime = (new Date()).getTime().toString().slice(0, 10);
      myQuery('insert into `dm_counsellor` (`id`,`name`,`password`,`sex`,`code`,`createtime`,`recenttime`,`description`) values (?,?,?,?,?,?,?,?)', [crypto.uudi36(), params.name, ciphertext, params.sex, params.code, createtime, '', params.description], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  },
  /*
  * 获取所有 counsellor 表的记录
  * currenPage 当前页码，默认每页显示 pageSize 条
  * return  Promise(Array(list))
  * */
  getAllCounsellor (currenPage = 1, pageSize = 10) {
    return new Promise((resolve, reject) => {
      myQuery('select `id`,`name`,`sex`,`code`,`status` from `dm_counsellor` limit ?,?', [(currenPage - 1)*pageSize, pageSize], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  },
  /*
  * 获取 counsellor 表的总记录数
  * return Promise(Number(total))
  * */
  getTotal () {
    return new Promise((resolve, reject) => {
      myQuery('select count(*) from `dm_counsellor`', (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data[0]['count(*)']);
        }
      })
    });
  },
  /*
  * 检查新注册的辅导员的名称是否已存在
  * params name
  * return Promise(Boolean(true))
  * */
  checkName (name) {
    return new Promise((resolve, reject) => {
      myQuery('select * from `dm_counsellor` where name=?', [name], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          if (data.length != 0) {
            reject('辅导员已存在！');
          } else {
            resolve(true);
          }
        }
      });
    });
  },
  /*
  * 检查新注册的辅导员的编号是否已存在
  * params code
  * return Promise(Boolean(true))
  * */
  checkCode (code) {
    return new Promise((resolve, reject) => {
      myQuery('select * from `dm_counsellor` where code=?', [code], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          if (data.length != 0) {
            reject('辅导员编号已存在！');
          } else {
            resolve(true);
          }
        }
      });
    });
  }
};

module.exports = CounsellorModel;