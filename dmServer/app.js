
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let { mycors, serverPort, serverHost } = require('./config');
// 创建服务器
const app = express();

/*
* 中间件
* */
const requireAuthentication = require('./middleware/authentication');
const removeOptions = require('./middleware/removeOptions');
const requestLogger = require('./middleware/requestLogs');
const requestError = require('./middleware/requestError');


/*
* 路由
* */
const indexRouter = require('./router/index');
const userRouter = require('./router/user');
const apiRouter = require('./router/api');
const reqRouter = require('./router/request');


// 跨域配置
app.use(cors({
  origin: mycors.origin,
  methods: mycors.methods,
  alloweHeaders: mycors.alloweHeaders
}));


// post方式提交数据的提前声明  接受json数据
app.use(bodyParser.json());
// extended: true 表示可以接受任何数据类型的数据
app.use(bodyParser.urlencoded({extended: true}));


// 配置静态目录
// 所有的url路径都可以用这个静态文件目录
app.use(express.static(__dirname + '/public'));
// 将文件设置成静态
app.use('/public', express.static('public'));



console.log('start');
app.use(removeOptions);
app.use('/', indexRouter);
// 用户处理
app.use('/user', userRouter);
// 数据处理并做身份token核验
app.use('/api', requireAuthentication, requestLogger, apiRouter);
app.use('/req', requireAuthentication, requestLogger, reqRouter);
app.get('/err', (req, res, next) => {
  throw new Error("BROKEN"); // Express will catch this on its own
});
app.use(requestError);



app.listen(serverPort, serverHost, () => console.log('dm app listening on port 3000!'));
