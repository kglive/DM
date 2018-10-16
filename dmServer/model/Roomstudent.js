/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/15
  * Time: 1:14
  * roomstudent 课堂表 模型 表操作方法集
  */

const myQuery = require('../module/mysql');
const { getStudentInfoByid } = require('./Student');
const { flattenArr } = require('../module/tools');

const RoomstudentModel = {
  /*
  * 根据课堂id获取课堂的学生
  * params classroomid
  * return Promise(Array(list));
  * */
  getStuInClassroom (classroomid) {
    return new Promise((resolve , reject) => {
      myQuery('select `studentid` from `dm_roomstudent` where `classroomid`=?', [classroomid], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          let promiseList = [];
          for (let i = 0, id; id = data[i]; i++) {
            promiseList.push(getStudentInfoByid(id['studentid']));
          }
          Promise.all(promiseList).then(data => {
            data = flattenArr(data);
            resolve(data);
          }).catch(error => {
            reject('获取学生信息失败!'+error);
          });
        }
      });
    });
  },
  /*
  * 获取课堂中的班级中的人数（该班级在该课堂中的人数，并非班级总人数）
  * params {
  *   classid: '',
  *   classroomid: ''
  * }
  * return {
  *   classid: '',
  *   number:
  * }
  * */
  getNumberByClassidInClassroom (params) {
    return new Promise((resolve, reject) => {
      myQuery('select count(*) from `dm_roomstudent` where `classid`=? and `classroomid`=? and `status`=?', [params.classid, params.classroomid, 0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve({classid: params.classid, classroomid: params.classroomid, number: data[0]['count(*)']});
        }
      });
    });
  }
};

module.exports = RoomstudentModel;