/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/24
  * Time: 12:38
  * 去除请求中的所有options请求
  */


const removeOptions = (req, res, next) => {
  console.log('removeOptions');
  if (req.method.toLocaleLowerCase() === 'options') {
    res.status(204);
    return res.json({}); // 直接返回空数据，结束此次请求
  } else {
    next();
  }
  // req.method == 'OPTIONS' ? res.end() : next();
};

module.exports = removeOptions;