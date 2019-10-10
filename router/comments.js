//  负责和评论相关的路由
const express = require('express');
const router = express.Router();
const commentsController = require('../controller/comments');

// 监听页面的请求
router.get('/comments.html',commentsController.getCommentsPage)

module.exports=router



