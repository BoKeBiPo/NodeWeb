/*const redis = require('redis');
const winston = require('winston');
var logger = new winston.Logger();

const redisObj = {
    client: null,
    connect: function () {
        this.client = redis.createClient();
        this.client.on('error', function (err) {
            logger.log('redisCache Error ', err);
        });
        this.client.on('ready', function () {
            console.info('redisCache connection succeed');
        });
    },
    init: function () {
        this.connect(); // 创建连接
        const instance = this.client;
        // 主要重写了一下三个方法。可以根据需要定义。
        const get = instance.get;
        const set = instance.set;
        const setex = instance.setex;
        instance.set = function (key, value, callback) {
            if (value !== undefined) {
                set.call(instance, key, JSON.stringify(value), callback);
            }
        };
        instance.get = function (key, callback) {
            get.call(instance, key, (err, val) => {
                if (err) {
                    logger.log('redis.get: ', key, err);
                }
                callback(null, JSON.parse(val));
            });
        };

        // 可以不用传递expires参数。在config文件里进行配置。
        instance.setex = function (key, value, callback) {
            if (value !== undefined) {
                setex.call(instance, key,  "", JSON.stringify(value), callback);
            }
        };
        return instance;
    },
};
// 返回的是一个redis.client的实例
module.exports = redisObj.init();
*/


var db = {};
var redis = require("redis");
var RDS_PORT = 6379;             //端口号
var RDS_HOST = '127.0.0.1';   //服务器IP  要连接的A服务器redis
var RDS_PWD = '123456';    //密码
var RDS_OPTS = {};             //设置项


var client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);


client.auth(RDS_PWD,function(){
    console.log('通过认证');
});

client.on("error", function (err) {
    console.log("Error :" , err);
});

client.on('connect', function(){
    console.log('Redis连接成功.');
});


/**
 * 添加string类型的数据
 * @param key 键
 * @params value 值
 * @params expire (过期时间,单位秒;可为空，为空表示不过期)
 * @param callBack(err,result)
 */
db.set = function(key, value, expire, callback){
    client.set(key, value, function(err, result){
        if (err) {
            console.log(err);
            callback(err,null);
            return;
        }
        if (!isNaN(expire) && expire > 0) {
            client.expire(key, parseInt(expire));
        }
        callback(null,result)
    })
}

/**
 * 查询string类型的数据
 * @param key 键
 * @param callBack(err,result)
 */
db.get = function(key, callback){
    client.get(key, function(err,result){
        if (err) {
            console.log(err);
            callback(err,null)
            return;
        }

        callback(null,result);
    });
}

module.exports = db;
