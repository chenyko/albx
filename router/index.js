// 负责主页请求分发
const express=require('express');
const router=express.Router();
const indexController= require('../controller/index');
router.get('/index.html',indexController.getIndexPage);
module.exports=router;