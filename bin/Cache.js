const NodeCache = require("node-cache");
const myCache = new NodeCache();


/// 获取当前应用程序指定CacheKey的Cache值
var GetCache=(CacheKey)=>{

        myCache.get( CacheKey, function( err, value ){
            //这里可以获取到数据
            if( !err ){
                if(value == undefined){
                    return "";
                }else{
                    console.log('反正数据之前面')
                    return value;
                }
            }else {
                return "";
            }
        });

};

/// 设置当前应用程序指定CacheKey的objObject值
var SetCache=(CacheKey,objObject)=>{
    myCache.set( CacheKey, objObject, function( err, success ) {
        if (!err && success) {
            return success;
        }
    });
};

/// 设置当前应用程序指定CacheKey的objObject值
var SetCacheTtl=(CacheKey,objObject,ttl)=>{
    myCache.set( CacheKey, objObject,ttl, function( err, success ){
        if( !err && success ){
            return success;
        }
    });
};

/// 清除单一键缓存
var RemoveOneCache=(CacheKey)=>{
    myCache.del( CacheKey, function( err, success ){
        if( !err ){
            return success;
        }
    });
};

//模块导出
module.exports = {
    GetCache : GetCache ,       /// 获取当前应用程序指定CacheKey的Cache值
    SetCache   : SetCache ,     /// 设置当前应用程序指定CacheKey的objObject值
    SetCacheTtl  : SetCacheTtl ,    /// 设置当前应用程序指定CacheKey的objObject值 ttl时间
    RemoveOneCache : RemoveOneCache     /// 清除单一键缓存
}
