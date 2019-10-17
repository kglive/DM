/**
  * Created By yk
  * User: 1039458625@qq.com
  * Date: 2018/9/23
  * Time: 19:14
  * 系统配置
  */

const config = {
  "serverHost": '127.0.0.1',
  // 后台服务端口
  "serverPort": 3000,
  // 生成JWT的密钥
  "jwtSecret": 'dmsystem',
  // jwt 载荷配置
  payload: {
    iss: 'yk',
    sub: 'teacher',
    aud: 'www.dmsys.com',
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7,// 7天后过期
    nbf: Date.now()/1000,
    iat: Date.now()
  },
  // crypto-js模块 AES加密密钥配置
  "secretKey": 'dmsystem',
  // mysql模块 数据库连接配置
  "DB": {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'rollcall',
    maxConnection: 10
  },
  // cors模块 跨域配置
  "mycors": {
    origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083'],
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'Authorization']
  },
  // 配置文件上传参数
  "setUpload": {
    // 定义 单文件 文件上传字段名称
    "onlyOneFileField": 'avatarfile',
    // 定义多文件 文件上传字段名称
    "moreFileField": 'galleryfiles',
    // 单词最大上传文件数
    "uploadFileMax": 10,
    // 单词最小上传文件数
    "uploadFileMin": 1,
    // 允许的图片类型 mimetype
    "acceptImg": ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'],
    "minSize": 1024, // 文件最小1k,
    "maxSize": 1024 * 1024 * 2, // 文件最大2M
  }
};

module.exports = config;