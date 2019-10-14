// 负责跟用户操作相关的路由
const express=require('express');
const router=express.Router();
const userController=require('../controller/user');
// 监听用户登录页面
router.get('/login.html',userController.getLoginPage);
// 监听用户登录请求
router.post('/userLogin',userController.userLogin);

// 监听用户退出登陆的请求
router.get('/logout',userController.logout)
module.exports=router;