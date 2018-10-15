/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/10
  * Time: 0:31
  * classroom 表操作 课堂模块
  */

const myQuery = require('../module/mysql');
const crypto = require('../module/crypto');
const { serverHost, serverPort } = require('../config');
const { flattenArr, uniqueArr } = require('../module/tools');
const { getNumberByClassid } = require('./Student');
const { getTeacherById } = require('./Teacher');
const { getClassById } = require('./Classes');
const { getStuInClassroom } = require('./Roomstudent');

const ClassroomModel = {
  /*
  * 新增课堂
  * params = {
  *   classid: ''， // 以逗号分隔
  *   teacherid: '', // 以逗号分隔
  *   name: '',
  *   code: '',
  *   period: 1,
  *   description: ''
  *   starttime: '', // 10位时间戳
  *   endtime: '', // 10位时间戳
  * }
  * return Promise(Boolean(true))
  * */
  addClassroom (params) {
    console.log('params', params);
    return new Promise((resolve, reject) => {
      myQuery('insert into `dm_classroom` (`id`,`classid`,`teacherid`,`name`,`code`,`period`,`description`, `picture`, `starttime`,`endtime`) values (?,?,?,?,?,?,?,?,?,?)', [crypto.uudi36(), params.classid, params.teacherid, params.name, params.code, params.period, params.description, params.path, params.starttime, params.endtime], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(true);
        }
      });
    });
  },
  /*
  * 检查 课堂的编号 code 是否重复
  * return Promise(Boolean(true))
  * */
  checkCode (code) {
    return new Promise((resolve, reject) => {
      myQuery('select * from `dm_classroom` where code=?', [code], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          if (data.length) {
            reject('课堂编号已存在！');
          } else {
            resolve(true);
          }
        }
      });
    });
  },
  /*
  * 获取所有课堂列表
  * return Promise(Array(list));
  * */
  getAllClassroom () {
    return new Promise((resolve, reject) => {
      myQuery('select `id`,`classid`,`teacherid`,`name`,`code`,`period`,`description`,`picture` from `dm_classroom` where `status`=?', [0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          let allClassidList = uniqueArr(flattenArr(data.map(item => {
            return item['classid'].split(',');
          })));
          // TODO
          for (let i = 0, item; item = allClassidList[i]; i++) {
            getNumberByClassid(item).then(num => {
              allClassidList[i] = {classid: item, number: num};
              // console.log('allClassidList', allClassidList);
            }).catch(error => {
              reject(error);
            });
          }
          // TODO 处理老师信息
          let allTeacheridList = uniqueArr(flattenArr(data.map(item => {
            return item['teacherid'].split(',');
          })));
          let resultList = data.map(item => {
            item.picture = `http://${serverHost}:${serverPort}${item.picture}`;
            item.classid = item.classid.split(',');
            item.teacherid = item.teacherid.split(',');
            item.number = 0;
            return item;
          });
          resolve(resultList);
        }
      });
    });
  },
  /*
  * 获取可用课堂总数
  * return Promise(Number(num));
  * */
  getTotal () {
    return new Promise((resolve, reject) => {
      myQuery('select count(*) from `dm_classroom` where `status`=?', [0], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(data[0]['count(*)']);
        }
      });
    });
  },
  /*
  * 往课堂里添加学生
  * params = {
  *   classroomid: '',
  *   classid: '',
  *   studentids: []
  * }
  * return Promise(Boolean(true))
  * */
  addStudentToClassroom (params) {
    return new Promise((resolve, reject) => {
      let failList = [];
      for (let i = 0, id; id = params.studentids[i]; i++) {
        myQuery('insert into `dm_roomstudent` (`id`,`classroomid`,`classid`,`studentid`) values (?,?,?,?)', [crypto.uudi36(), params.classroomid, params.classid, id], (err, data) => {
          if (err) {
            myQuery('select `name`,`code` from `dm_student` where id=?', [id], (err, data) => {
              if (!err) {
                failList.push({name: data[0].name, code: data[0].code});
              }
            });
          }
        });
      }
      resolve(failList);
    });
  },
  /*
  * 根据课堂id返回课堂里的班级，老师列表
  * params classroomid
  * return Promise();
  * */
  getTCByClassroom (classroomid) {
    return new Promise((resolve, reject) => {
      myQuery('select `classid`,`teacherid` from `dm_classroom` where id=?', [classroomid], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          let resultList = {
            classidList: data[0]['classid'].split(','),
            teacheridList: data[0]['teacherid'].split(',')
          };
          let promiseList = [];
          for (let key in resultList) {
            if (key === 'classidList') {
              for (let i = 0, id; id = resultList['classidList'][i]; i++) {
                promiseList.push(getClassById(id));
              }
            } else if (key === 'teacheridList') {
              for (let i = 0, id; id = resultList['teacheridList'][i]; i++) {
                promiseList.push(getTeacherById(id));
              }
            }
          }
          promiseList.push(getStuInClassroom(classroomid));
          Promise.all(promiseList).then(data => {
            data = flattenArr(data);
            let classLen = resultList.classidList.length;
            let teacherLen = resultList.teacheridList.length;
            let result = {
              classList: data.slice(0, classLen),
              teacherList: data.slice(classLen, classLen+teacherLen),
              studentList: data.slice(classLen+teacherLen)
            };
            resolve(result);
          }).catch(error => {
            reject('获取失败:'+error);
          });
        }
      });
    });
  }
};


module.exports = ClassroomModel;