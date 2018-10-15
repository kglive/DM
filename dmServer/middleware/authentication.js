/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/24
  * Time: 12:17
  * token核验，获取用户信息
  */

const jwt = require('jwt-simple');
const { jwtSecret } = require('../config');

const requireAuthentication = (req, res, next) => {
  console.log('requireAuthentication');
  let authorization = req.headers['authorization'];
  if (authorization) {
    try {
      let getPayload = jwt.decode(authorization, jwtSecret);
      // 附加登录用户的身份信息到req上
      req.user = getPayload['user'];
      next();
    } catch (err) {
      // next({ errorCode: 401, errorMsg: 'Unauthorized' });
      // res.status(401).send('Unauthorized');
      res.json({status: 401, data: '', message: 'Unauthorized'});
    }
  } else {
    // 未授权
    // res.status(401).send('Unauthorized');
    res.json({status: 401, data: '', message: 'Unauthorized'});
  }
};


module.exports = requireAuthentication;