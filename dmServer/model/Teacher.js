/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/9
  * Time: 23:55
  * teacher 表操作 老师模块
  */

const myQuery = require('../module/mysql');


const TeacherModel = {
  /*
  * 获取所有老师
  * return Promise(Array(list));
  * */
  getAllTeachers () {
    return new Promise((resolve, reject) => {
      myQuery('select `id`,`name`,`code` from `dm_teacher` where status=?', [0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  },
  /*
  * 根据老师id，获取老师的id，name，code
  * return Promise({id: '', name: '', code: ''});
  * */
  getTeacherById (teacherid) {
    return new Promise((resolve, reject) => {
      myQuery('select `id`,`name`,`code` from `dm_teacher` where `id`=? and `status`=?', [teacherid, 0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data);
        }
      });
    });
  }
};

module.exports = TeacherModel;