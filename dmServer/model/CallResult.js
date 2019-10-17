/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/21
  * Time: 14:45
  * call_result 点名结果表操作
  */

const myQuery = require('../module/mysql');
const { uudi36 } = require('../module/crypto');

const CallResultModel = {
  /*
  * 新建点名
  * params = [
  *   {
  *     classroomid: this.search.classroomid,
  *     studentid: item.id,
  *     studentname: item.name,
  *     title: this.attendance.whyTitle,
  *     attendanceValue: item.attendanceValue,
  *     attendanceStatus: item.attendanceStatus,
  *     attendanceMark: item.attendanceMark
  *   }
  * ]
  * return Promise(Boolean(true))
  * */
  addCallResult (params) {
    return new Promise((resolve, reject) => {
      for (let i = 0, item; item = params[i]; i++ ) {
        myQuery('insert into `dm_call_result` (`id`,`classroomid`,`studentid`,`studentname`,`title`,`attendanceValue`,`attendanceStatus`,`attendanceMark`) values (?,?,?,?,?,?,?,?)', [uudi36(), item.classroomid, item.studentid, item.studentname, item.title, parseInt(item.attendanceValue), parseInt(item.attendanceStatus), item.attendanceMark], (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      }
    });
  }
};

module.exports = CallResultModel;
