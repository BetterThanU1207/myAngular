var express = require('express');
var userRouter = require('./routes/users');
var bodyParser = require('body-parser');
var dataRouter = require('./routes/datas');

var app = express();
// 处理表单数据
app.use(bodyParser.urlencoded({extended: false}));
// 处理json数据，也可以定义两个变量分不同的路由分别使用
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/datas', dataRouter);

app.listen(3000, () => {
    console.log('http://localhost:3000')
});