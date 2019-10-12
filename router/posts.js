// 负责文章相关的路由
const express=require('express');
const router=express.Router();
const postsController=require('../controller/posts');

// 监听页面请求
router.get('/posts.html',postsController.getPostsPage);

// 监听一个获取联表查询出来的数据的请求
router.get('/getAllPosts',postsController.getAllPosts);

// 监听获取分页页面请求
router.get('/getPostsByPage',postsController.getPostsByPage)
module.exports=router