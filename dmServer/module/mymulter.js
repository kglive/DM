/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/30
  * Time: 12:56
  * 文件上传模块
  */

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { setUpload } = require('../config');

// 获取时间 20181010
let getNowFormatDate = function () {
  let date = new Date();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentdate = date.getFullYear().toString() + month.toString() + strDate.toString();
  return currentdate;
}
// 创建目录，目录要一层一层创建
let createFolder = folder => {
  try {
    // 同步地测试指定的文件或目录的用户权限
    fs.accessSync(path.join(process.cwd(), folder), fs.constants.R_OK | fs.constants.W_OK);
  } catch (e) {
    fs.mkdirSync(path.join(process.cwd(), folder));
  }
};
let uploadFolder = `public/uploads/avataor/${getNowFormatDate()}`;
createFolder(uploadFolder);

let storage = multer.diskStorage({
  // 设置
  destination: path.join(process.cwd(), uploadFolder),
  filename: (req, file, callback) => {
    let filename = (file.originalname).split('.');
    callback(null, `${Date.now()}_${filename[0]}.${filename[filename.length-1]}`);
  }
});


// 限制文件类型
let fileFilter = function (req, file, callback) {
  console.log('fileFilter', req.files, file);
  if (setUpload.acceptImg.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
    callback(new Error('文件类型错误！'));
  }
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter
})
  //.single(setUpload.onlyOneFileField);
  .fields([{ name: setUpload.onlyOneFileField, maxCount: setUpload.uploadFileMin }, { name: setUpload.moreFileField, maxCount: setUpload.uploadFileMax }]);

module.exports = upload;