/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/24
  * Time: 12:47
  * 请求错误处理
  */

const requestError = (err, req, res, next) => {
  console.log('1231231err', err);
  // TODO 写错误日志
  res.status(500).send('Something break!');
  next();
};

module.exports = requestError;