var express = require('express');
var router=express.Router();

router.get('/',function (req,res,next) {
    res.render('main/index');
});

router.get('/welcome.html',function (req,res,next) {
    res.render('main/welcome.html');
});

module.exports=router;