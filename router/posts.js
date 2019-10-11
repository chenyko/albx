// 负责文章相关的路由
const express=require('express');
const router=express.Router();
const postsController=require('../controller/posts');

router.get('/posts.html',postsController.getPostsPage);


module.exports=router