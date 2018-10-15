/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/8
  * Time: 0:08
  * student 学生表 操作
  */

const myQuery = require('../module/mysql');
const crypto = require('../module/crypto');
const { serverHost, serverPort } = require('../config');


const StudentModel = {
  /*
  * 添加学生
  * params {
  *   name: '',
  *   sex: '',
  *   code: '',
  *   classid: '',
  *   phone: '',
  *   qq: '',
  *   gravatar: ''
  * }
  * return Promise(Boolean(true))
  * */
  addStudent (params) {
    return new Promise((resolve, reject) => {
      myQuery('insert into `dm_student` (`id`,`name`,`sex`,`code`,`classid`,`phone`,`qq`,`gravatar`) values (?,?,?,?,?,?,?,?)', [crypto.uudi36(), params.name, params.sex, params.code, params.classid, params.phone, params.qq, params.gravatar], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(true);
        }
      });
    });
  },
  /*
  * 检查学生学号是否已存在
  * code 学号
  * return Promise(Boolean(true));
  * */
  checkCode (code) {
    return new Promise((resolve, reject) => {
      myQuery('select * from `dm_student` where code=?', [code], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          if (data.length != 0) {
            reject('学号已存在！');
          } else {
            resolve(true);
          }
        }
      });
    });
  },
  /*
  * 按班级id获取班级学生列表
  * params = {
  *   classid: '必传',
  *   counsellorid: '',
  *   search: '',
  *   currentPage: 1,
  *   pageSize: 10
  * }
  * return Promise(Array(list))
  * */
  getAllStudentByClass (params) {
    return new Promise((resolve, reject) => {
      let page = parseInt(params.currentPage) || 1;
      let size = parseInt(params.pageSize) || 10;
      myQuery('select * from `dm_student` where classid=? limit ?,?', [params.classid, (page - 1)*size, size], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          let resultList = data.map(item => {
            item.gravatar = `http://${serverHost}:${serverPort}${item.gravatar}`;
            return item;
          });
          resolve(resultList);
        }
      });
    });
  },
  /*
  * 获取班级中学生总人数
  * params classid
  * return Promise(Number());
  * */
  getTotal (classid) {
    return new Promise((resolve, reject) => {
      myQuery('select count(*) from `dm_student` where classid=?', [classid], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data[0]['count(*)']);
        }
      });
    });
  },
  /*
  * 根据班级id获取班级下的人数
  * params classid
  * return Promise(Number(num));
  * */
  getNumberByClassid (classid) {
    return new Promise((resolve, reject) => {
      myQuery('select count(*) from `dm_student` where `classid`=? and `status`=?', [classid, 0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data[0]['count(*)']);
        }
      });
    });
  },
  /*
  * 根据 学生id 获取学生信息
  * params studentid
  * return {
  *
  * }
  * */
  getStudentInfoByid (studentid) {
    return new Promise((resolve, reject) => {
      myQuery('select * from `dm_student` where `id`=? and `status`=?', [studentid, 0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          let resultList = data.map(item => {
            item.gravatar = `http://${serverHost}:${serverPort}${item.gravatar}`;
            return item;
          });
          resolve(resultList);
        }
      });
    });
  }
};

module.exports = StudentModel;
