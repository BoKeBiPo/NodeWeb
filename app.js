
//Web应用框架
var express = require('express');
var app = express();
//模板引擎
var swig=require('swig');
//访问错误
var createError = require('http-errors');

//创建一个http模块
var  http=require('http');
//操作URL
var  url= require('url');
// 路径
var path = require('path');
//操作文件
var  fs= require('fs');
//操作字符串
var  querystring=require('querystring');
//数据库文件
var implementmysql = require('./bin/MySqlHelper');

var session = require("express-session");
var cookieParser = require('cookie-parser');

// 配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎名称，同时也是模板文件后缀，第二个这是解析模板的方法
app.engine('html',swig.renderFile);
//设置模板文件存放目录，第一个参数必须的views,第二个参数这是目录
app.set('views','./views');
//注册所使用的模板引擎
app.set('view engine', 'html');
//设置静态文件
app.use('/public',express.static(__dirname+'/public'));

//开发过程中 是否需要清除模板缓存
swig.setDefaults({cache:false});

//根据不同的功能——划分模块
app.use('/admin',require('./routes/admin'));
app.use('/api',require('./routes/api'));
app.use('/test',require('./routes/test'));
app.use('/',require('./routes/main'));

// 404
app.get('*', function(req, res){
    res.render('404.html')
});

app.listen(8080);

