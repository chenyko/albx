// 负责和分类相关的路由操作
const express=require('express');
const router=express.Router();
const categoryController=require('../controller/category');

// 监听分类页面的请求
router.get('/category.html',categoryController.getCategoryPage);



module.exports=router;