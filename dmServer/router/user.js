/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/23
  * Time: 19:29
  * 
  * 用户注册，登录，退出
  */


const express = require('express');
const jwt = require('jwt-simple');
const router = express.Router();
const crypto = require('../module/crypto');
const myQuery = require('../module/mysql');
const { jwtSecret, payload } = require('../config');


router.post('/reg', (req, res, next) => {
  // TODO 死亡嵌套
  myQuery('select * from `dm_teacher` where name=?', [req.body.username], (err, data) => {
    if (!err) {
      if (data.length == 0) {
        let teachercode = `T${req.body.code}`;
        // 查询编号是否已存在
        myQuery('select * from `dm_teacher` where code=?', [teachercode], (err, data) => {
          if (err) {
            res.json({status: 2, data: '注册失败！'});
          } else if (data.length == 0) {
            let ciphertext = crypto.encrypt(req.body.password).toString();
            let createtime = (new Date()).getTime().toString().slice(0, 10);
            myQuery('insert into `dm_teacher` (`id`, `name`, `password`, `sex`, `code`, `createtime`) values (?, ?, ?, ?, ?, ?)', [crypto.uudi36(), req.body.username, ciphertext, req.body.sex, teachercode, createtime], (err, data) => {
              if (err) {
                res.json({status: 2, data: '注册失败！'});
              } else {
                res.json({status: 0, data: {username: req.body.username, sex: req.body.sex}});
              }
            });
          } else {
            res.json({status: 1, data: '该老师编号已存在，请更换一个！'});
          }
        });
      } else {
        res.json({status: 1, data: '该用户名已存在！'});
      }
    } else {
      res.status(500).send('Server Error!');
    }
  });
});


// 登录
router.get('/login', (req, res, next) => {
  myQuery('select * from `dm_teacher` where name=?', [req.query.username], (err, data) => {
    if (err) {
      res.status(500).send('Server Error!');
    } else if (data.length == 1) {
      if (data[0].status == 0) {
        let plaintext = crypto.decrypt(data[0].password);
        if (req.query.password == plaintext) {
          let token = jwt.encode(Object.assign({
            user: {
              uid: data[0].id,
              username: data[0].name,
              sex: data[0].sex,
              code: data[0].code
            }
          }, payload), jwtSecret);
          res.json({status: 0, data: {username: req.query.username, sex: data[0].sex}, token: token});
        } else {
          res.json({status: 2, data: `用户 ${req.query.username} 登录密码错误！`});
        }
      } else {
        res.json({status: 2, data: `用户 ${req.query.username} 已被禁止使用！`});
      }
    } else {
      res.json({status: 1, data: `用户 ${req.query.username} 不存在！`});
    }
  });
});



module.exports = router;