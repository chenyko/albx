const express=require('express');
const router=express.Router;
const frontSideController=require('../controller/frontSide')
router.get('/index.html',frontSideController.getIndexPage);
router.get('/list.html',frontSideController.getListPage);
router.get('/detail.html',frontSideController.getDetailPage);






module.exports=router;