var express = require('express');
var router=express.Router();


router.get('/user',function (req,res,next) {
    res.send('user-admin');
});

router.get('/',function (req,res,next) {
    res.render('admin/index',data);

});



router.get('/Vue',function (req,res,next) {
    res.render('admin/Vue.vue');
});

module.exports=router;
