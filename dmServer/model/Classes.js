/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/7
  * Time: 0:27
  * class 班级表 模型 表操作方法集
  */

const myQuery = require('../module/mysql');
const crypto = require('../module/crypto');

const ClassModel = {
  /*
  * 查看班级编号是否重复
  * params code
  * return Promise(Boolean(true))
  * */
  checkCode (code) {
    return new Promise((resolve, reject) => {
      myQuery('select * from `dm_class` where code=?', [code], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          if (data.length != 0) {
            reject('该班级编号已存在!');
          } else {
            resolve(true);
          }
        }
      });
    });
  },
  /*
  * 添加班级
  * params {
  *   name: '',
  *   code: '',
  *   description: '',
  *   counsellorid: ''
  * }
  * */
  addClasses (params) {
    return new Promise((resolve, reject) => {
      myQuery('insert into `dm_class` (`id`,`name`,`code`,`counsellorid`,`description`) values (?,?,?,?,?)', [crypto.uudi36(), params.name, params.code, params.counsellorid, params.destination], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(true);
        }
      });
    });
  },
  /*
  * 获取班级列表
  * return Promise(Array(list))
  * */
  getAllClasses () {
    return new Promise((resolve, reject) => {
      myQuery('select `id`,`name`,`code` from `dm_class` where `status`=?', [0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  },
  /*
  * 根据 classid 获取班级信息
  * return
  * */
  getClassById (classid) {
    return new Promise((resolve, reject) => {
      myQuery('select `id`,`name`,`code` from `dm_class` where `id`=? and `status`=?', [classid, 0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }

};


module.exports = ClassModel;