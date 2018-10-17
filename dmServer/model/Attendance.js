/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/17
  * Time: 23:43
  * attendance 考勤任务表 操作
  */
const myQuery = require('../module/mysql');
const { uudi36 } = require('../module/crypto');
const moment = require('moment');


const AttendanceModel = {
  /*
  * 新建考勤任务
  * params = {
  *   name: '',
  *   classroomid: '',
  *   starttime: '06:15',
  *   endtime: '07:00',
  *   teacherid: '',
  *   description: '',
  *   remark: ''
  * }
  * return Promise(Boolean(true))
  * */
  addAttendance (params) {
    return new Promise((resolve, reject) => {
      // TODO 同一个课堂的多个考勤任务的时间段都不能交叉
      myQuery('insert into `dm_attendance` (`id`,`name`,`classroomid`,`starttime`,`endtime`,`teacherid`,`description`,`remark`) values (?,?,?,?,?,?,?,?)', [uudi36(), params.name, params.classroomid, params.starttime, params.endtime, params.teacherid, params.description, params.remark], (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          resolve({
            name: params.name,
            starttime: moment(parseInt(params.starttime)).format('YYYY-MM-DD HH:mm:ss'),
            endtime: moment(parseInt(params.endtime)).format('YYYY-MM-DD HH:mm:ss')
          });
        }
      });
    });
  }
};

module.exports = AttendanceModel;

