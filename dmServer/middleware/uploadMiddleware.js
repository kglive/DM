/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/6
  * Time: 15:13
  * 文件上传中间件
  */

const upload = require('../module/mymulter');
const { setUpload } = require('../config');

const uploadMiddleware =  (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      // 错误捕获
      res.json({status: 99, data: '', message: err.message});
    } else {
      next();
    }
  });
};


module.exports = uploadMiddleware;
