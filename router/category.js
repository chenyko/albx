// 负责和分类相关的路由操作
const express=require('express');
const router=express.Router();
const categoryController=require('../controller/category');

// 监听分类页面的请求
router.get('/category.html',categoryController.getCategoryPage);

//监听获取所有的分类数据的请求
router.get('/getAllCategory',categoryController.getAllCategory)

// 监听新增请求
router.post('/addNewCategory',categoryController.addNewCategory)

// 监听删除数据的请求
router.get('/deleteCategoryById',categoryController.deleteCategoryById);

// 监听获取单条数据的请求
router.get('/getCategoryById',categoryController.getCategoryById);

// 监听修改分类的请求
router.post('/editCateogryById',categoryController.editCateogryById)


module.exports=router;