/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/24
  * Time: 12:41
  * api请求日志，所有的请求都记录下来
  */
const requestLogger = function (req, res, next) {
  console.log('LOGGED');
  // TODO 写日志
  next();
};

module.exports = requestLogger;