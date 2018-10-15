/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/10/6
  * Time: 16:43
  * 辅导员模块
  */

  const express = require('express');
  const router = express.Router();

  /*
  * 添加辅导员
  * */
  router.post('/addsellor', (req, res, next) => {
    res.json({status: 0, data: '', message: '请求辅导员模块成功！'});
  });





  module.export = router;
