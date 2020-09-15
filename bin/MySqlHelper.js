const mysql  = require('mysql');

var pool  = mysql.createPool( {
    host : '127.0.0.1',
    user : 'root',
    password : 'xxxxxxxx',
    database : 'test',
} );

//将结果已对象数组返回 列表
var GetList=( sql , params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return;
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
};

//返回一个对象 一行数据
var first=( sql, params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return;
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve( res[0] || null );
            });
        });
    });
};

//返回单个查询结果 列如：查询数量 合计 等等
var single=(sql , params )=>{
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return;
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject( error );
                    return;
                }
                for( let i in res[0] )
                {
                    resolve( res[0][i] || null );
                    return;
                }
                resolve(null);
            });
        });
    });
}

//执行代码，返回执行结果 增加 删除 修改
var execute=(sql , params )=>{
    return  new  Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(err){
                reject(err);
                return;
            }
            connection.query( sql , params , function(error,res){
                connection.release();
                if(error){
                    reject(error);
                    return;
                }
                resolve(res);
            });
        });
    });
}

//模块导出
module.exports = {
    GetList : GetList , //将结果已对象数组返回
    FIRST   : first ,     //返回一个对象 一行数据
    SINGLE  : single ,    //返回单个查询结果 列如：查询数量 合计 等等 （未成功）
    EXECUTE : execute     //执行代码，返回执行结果 增加 删除 修改 查询数量 合计 等等
}




