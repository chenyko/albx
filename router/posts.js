// 负责文章相关的路由
const express=require('express');
const router=express.Router();
const postsController=require('../controller/posts');

// 监听页面请求
router.get('/posts.html',postsController.getPostsPage);

// 监听一个获取联表查询出来的数据的请求
router.get('/getAllPosts',postsController.getAllPosts);

// 监听获取分页页面请求
router.get('/getPostsByPage',postsController.getPostsByPage);

// 监听新增文章页面的请求
router.get('/post-add.html',postsController.getPostAddPage);

// 监听筛选的请求
router.get('/getPostsByFilter',postsController.getPostsByFilter);

// 监听一个上传图片的请求
router.post('/uploadFeature',postsController.uploadFeature);

// 监听新增文章的请求
router.post('/addNewPost',postsController.addNewPost);

// 监听删除文章的请求
router.get('/deletePostById',postsController.deletePostById);

// 监听根据id获取旧数据的方法
router.get('/getPostsById',postsController.getPostsById)

// 监听修改请求
router.post('/editPostById',postsController.editPostById)

module.exports=router