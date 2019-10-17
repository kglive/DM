/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/24
  * Time: 10:16
  * 
  */

const express = require('express');
const path = require('path');
const router = express.Router();
const rootPath = path.join(__dirname,'../');
const { serverHost, serverPort } = require('../config');
const { getNowFormatDate } = require('../module/tools');




/*
* @params controller 中转方法
*
* 中转下发各具体请求
* */
router.all('/*', (req, res, next) => {
  console.log('请求了api接口');
  next();
});


const CounsellorModle = require('../model/Counsellor');
/*
* 添加辅导员
*
*/
router.post('/counsellor/addsellor', (req, res, next) => {
  if (req.body.name && req.body.code) {
    Promise.all([CounsellorModle.checkName(req.body.name), CounsellorModle.checkCode(req.body.code)]).then(_ => {
      CounsellorModle.addCounsellor({
        name: req.body.name,
        code: req.body.code,
        sex: req.body.sex,
        password: req.body.password,
        destination: req.body.destination
      });
    }).then(data => {
      res.json({status: 0, data: {name: req.body.name, code: req.body.code}, message: '添加成功！'});
    }).catch(err => {
      res.json({status: 1, data: '', message: err});
    });
  }
});
/*
* 获取所有辅导员列表
* */
router.get('/counsellor/getAllCounsellor', (req, res, next) => {
  Promise.all([CounsellorModle.getAllCounsellor(parseInt(req.query.currenPage), parseInt(req.query.pageSize)), CounsellorModle.getTotal()]).then(data => {
    res.json({status: 0, data: {list: data[0], total: data[1]}, message: '获取成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: error.message});
  });
});



const ClassModel = require('../model/Classes');
/*
* 添加班级
* */
router.post('/classes/addclass', (req, res, next) => {
  ClassModel.checkCode(req.body.code).then(_ => {
    ClassModel.addClasses({
      name: req.body.name,
      code: req.body.code,
      counsellorid: req.body.counsellorid,
      description: req.body.description
    });
  }).then(data => {
    res.json({status: 0, data: {name: req.body.name, code: req.body.code}, message: '添加成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: error});
  });
});
/*
* 获取班级列表
* */
router.get('/classes/getAllClasses', (req, res, next) => {
  ClassModel.getAllClasses().then(data => {
    res.json({status: 0, data: data, message: '班级列表获取成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: error});
  });
});



const StudentModel = require('../model/Student');
/*
* 往班级里添加学生
* params = {
*    name: req.body.name,
*    sex: req.body.sex,
*    code: req.body.code,
*    classid: req.body.classid,
*    phone: req.body.phone,
*    qq: req.body.qq,
*    gravatar: req.body.gravatar
  }
* */
router.post('/student/addstu', (req, res, next) => {
  StudentModel.checkCode(req.body.code).then(_ => {
    StudentModel.addStudent({
      name: req.body.name,
      sex: req.body.sex,
      code: req.body.code,
      classid: req.body.classid,
      phone: req.body.phone,
      qq: req.body.qq,
      gravatar: req.body.gravatar
    });
  }).then(data => {
    res.json({status: 0, data: {name: req.body.name, code: req.body.code}, message: '添加成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: error});
  });
});
/*
* 获取班级下的学生列表，可以模糊搜索
* params = {
*   classid: '',
*   counsellorid: '',
*   search: '',
*   currentPage: 1,
*   pageSize: 10
* }
* */
router.get('/student/getAllStudentByClassid', (req, res, next) => {
  Promise.all([
    StudentModel.getAllStudentByClass({
      classid: req.query.classid,
      search: req.query.search,
      currentPage: req.query.currentPage,
      pageSize: req.query.pageSize
    }),
    StudentModel.getTotal(req.query.classid)
  ]).then(data => {
    res.json({status: 0, data: {list: data[0], total: data[1]}, message: '获取成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: error});
  });
});



const TeacherModel = require('../model/Teacher');
/*
* 获取所有老师
* */
router.get('/teacher/getAllTeacher', (req, res, next) => {
  TeacherModel.getAllTeachers().then(data => {
    res.json({status: 0, data: data, message: '获取成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: error});
  });
});



const ClassroomModel = require('../model/Classroom');
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
*   path: '课堂封面相对地址'
* }
* */
router.post('/classroom/addClassroom', (req, res, next) => {
  ClassroomModel.checkCode(req.body.code).then(_ => {
    ClassroomModel.addClassroom({
      classid: req.body.classid.join(),
      teacherid: req.body.teacherid.join(),
      name: req.body.name,
      code: req.body.code,
      period: parseInt(req.body.period),
      description: req.body.description,
      starttime: parseInt(req.body.daterange[0].toString().slice(0, 10)),
      endtime: parseInt(req.body.daterange[1].toString().slice(0, 10)),
      path: req.body.path
    });
  }).then(data => {
    res.json({status: 0, data: {name: req.body.name, code: req.body.code, period: parseInt(req.body.period)}, message: '添加成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: error});
  });
});
/*
* 获取所有课堂列表
* */
router.get('/classroom/getAllClassroom', (req, res, next) => {
  Promise.all([
    ClassroomModel.getAllClassroom(),
    ClassroomModel.getTotal()
  ]).then(data => {
    res.json({status: 0, data: {list: data[0], total: data[1]}, message: '获取成功'});
  }).catch(error => {
    res.json({status: 1, data: '', message: error});
  });
});
/*
* 往课堂里添加学生
* params = {
*   classroomid: '',
*   classid: '',
*   studentids: []
* }
* */
router.post('/classroom/addStudents', (req, res, next) => {
  ClassroomModel.addStudentToClassroom({
    classroomid: req.body.classroomid,
    classid: req.body.classid,
    studentids: req.body.studentids
  }).then(data => {
    res.json({status: 0, data: {faillist: data}, message: '添加成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: '添加失败！'});
  });
});
/*
* 根据课堂id返回课堂里的班级，老师列表，学生列表
* params classroomid
* */
router.get('/classroom/getTCByClassroom', (req, res, next) => {
  ClassroomModel.getTCByClassroom(req.query.classroomid).then(data => {
    res.json({status: 0, data: data, message: '获取成功！'});
  }).catch(error => {
    res.json({status: 1, data: '', message: '获取失败！'});
  });
});


const AttendanceModel = require('../model/Attendance');
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
* */
router.post('/attendance/addAttendance', (req, res, next) => {
  let params = {
    name: req.body.name,
    classroomid: req.body.classroomid,
    starttime: (_ => {
      let datatime = `${getNowFormatDate()} ${req.body.starttime}:00`;
      return new Date(datatime).getTime();
    })(),
    endtime: (_ => {
      let datatime = `${getNowFormatDate()} ${req.body.endtime}:00`;
      return new Date(datatime).getTime();
    })(),
    teacherid: req.body.teacherid,
    description: req.body.description,
    remark: req.body.remark
  };
  console.log(params);
  AttendanceModel.addAttendance(params).then(data => {
    res.json({status: 0, data: data, message: '新建考勤任务成功'});
  }).catch(error => {
    res.json({status: 1, data: '', message: '新建考勤任务失败'+error});
  });
});


const CallResultModel = require('../model/CallResult');
/* 课堂点名 call_result */
router.post('/callresult/add', (req, res, next) => {
  CallResultModel.addCallResult(req.body.list).then(() => {
    res.json({status: 0, data: '', message: '考勤成功'});
  }).catch(error => {
    res.json({status: 1, data: '', message: '添加考勤名单失败'+error});
  });
});



/*
* 头像上传
* upload.single('gravatarpic') 单图
* */
// const upload = require('../module/mymulter');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const { setUpload } = require('../config');
// 单图
router.post('/gravatar', uploadMiddleware, (req, res) => {
  console.log('上传文件-----------------', rootPath);
  console.log('文件', req.files);
  let file = req.files[setUpload.onlyOneFileField][0];
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  console.log('上传文件-----------------');
  // D:\wwwjwt\DM\dmServer\
  // D:\wwwjwt\DM\dmServer\public\uploads\avataor\1538927195105_1_03.PNG
  let path = file.path.replace(rootPath, '/');
  let url = `http://${serverHost}:${serverPort}${path}`.replace('\\', '\/');
  res.json({status: 0, message: '上传成功！', data: {path: path, url: `http://${serverHost}:${serverPort}${path}`.replace('\\', '\/')}});
});
// 多图
router.post('/gallery', uploadMiddleware, (req, res) => {
  console.log('上传文件 start-----------------');
  console.log('文件', req.files);
  console.log('上传文件 end-----------------');

  res.json({status: 0, message: '多图片上传', data: ''});
});



module.exports = router;
