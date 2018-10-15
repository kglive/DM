/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/28
  * Time: 23:46
  * 前端配置
  */

const config = {
  approot: 'http://localhost:8080',
  // 后台请求更目录
  requestUrl: 'http://localhost:3000',
  // 请求超时时间
  requestTimeout: 1000 * 15,
  // 定义 单文件 文件上传字段名称
  onlyOneFileField: 'avatarfile',
  // 定义多文件 文件上传字段名称
  moreFileField: 'galleryfiles'
};

module.exports = config;
