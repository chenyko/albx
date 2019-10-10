// 负责处理和分类相关的逻辑

 const categoryModel = require('../model/category');

module.exports={
    getCategoryPage(req,res){
        res.render('admin/categoryies')
    },
    // 处理所有分类数据的请求
    getAllCategory(req,res){
     categoryModel.getAllCategory(data=>{
         let response=data instanceof Array?{code:200,mag:'ok',data}:{code:500,mag:'获取出错'};
         res.send(response);
     })   
    }
}