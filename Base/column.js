var implementmysql = require('./../bin/MySqlHelper');
var myCache = require('./../bin/Cache');
var CacheColumn="CacheColumn";


function  GetColumn() {
    (async ()=>{
        var  Result=await GetCache();
        console.log(Result);
        return  Result;
    })();
}


function GetCache(){
    (async ()=>{
        var  Result= await myCache.GetCache(CacheColumn); //获取缓存


        if (Result == null || Result == "") {
            var sql="SELECT * FROM sltbl_column where Status=0 ";
            Result = await implementmysql.GetList(sql, null);
           var success= myCache.SetCache(CacheColumn, Result);//保存缓存
            console.log(success);
        }else {
            console.log("不需要缓存");
        }
        return Result;
    })();
}


module.exports = {
    GetColumn : GetColumn  //将结果已对象数组返回

}

