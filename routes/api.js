var express = require('express');
var router=express.Router();

var implementmysql = require('./../bin/MySqlHelper');
var cache = require('./../bin/Cache');
var DataColumn=require('./../Base/column');
var Redis =require('./../bin/RedisCache');

var redis = require("redis");
//缓存
const NodeCache = require("node-cache");
const myCache = new NodeCache();

router.get('/user',function (req,res,next) {
    res.send('user-api');
});

router.use('/UserAdd',function (req,res,next) {

    var  sql="INSERT INTO user_tbale (title,flag) VALUES ('测试',1);";
    var Result=null;
    /*
    Result =  implementmysql.EXECUTE(sql,null).then(data => {
        Result = data;
        console.log(data);
    }, result => {
        console.log('reject',result);
    });*/

    (async ()=>{
        Result = await implementmysql.EXECUTE(sql,null);
        console.log(Result);
        res.send(Result);
    })();

});

router.use('/UserGetMode',function (req,res,next) {
    (async ()=>{
        var  sql="SELECT * FROM user_tbale where id = 8064 ";
        var  Result= await implementmysql.FIRST(sql,null);
        console.log(Result);
        res.send(Result);
    })();

});

router.use('/UserGetList',function (req,res,next) {
    (async ()=>{
        var sql="SELECT * FROM user_tbale";
        var Result = await implementmysql.GetList(sql,null);
        console.log(Result);
        res.send(Result);
    })();
});

router.use('/UserGetCount',function (req,res,next) {
    (async ()=>{
        var  sql="SELECT count(id) Count FROM user_tbale";
        var  Result= await implementmysql.EXECUTE(sql,null);
        console.log(Result);
        res.send(Result);
    })();

});

router.use('/GetColumnList',function (req,res,next) {

    Redis.get("GetColumnList",function (err,result) {
        if (result==null){
            Redis.set("GetColumnList","是缓存测试一下",3600,redis.print);
            res.send("不是缓存");
        } else {
            res.send(result);
        }
    });

    /*  myCache.get( "GetColumnList", function( err, value ){
         //这里可以获取到数据
         if( !err ){
             console.log(err);
             if(value == undefined){
                 console.log(value);
                 cache.SetCache("GetColumnList","是缓存测试一下");
                 res.send("不是缓存测试一下");
             }else{
                 console.log(1);
                 console.log(value);
                 res.send(value);
                 return value;
             }
         }else {
             res.send("");
         }
     });


     /* var data= cache.GetCache("GetColumnList");
      console.log(data)
     if (data==null||data==""||data==undefined){
          cache.SetCache("GetColumnList","是缓存测试一下");
          res.send("不是缓存测试一下");
      }else{
          res.send(data);
     }*/

});



module.exports=router;
