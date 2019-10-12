// 负责处理和文章相关的逻辑
const postModel=require('../model/posts')

module.exports={
    getPostsPage(req,res){
        res.render('admin/posts');
    },
    // 获取连表数据查询的方法
    getAllPosts(req,res){
        let response=data instanceof Array?{code:200,msg:'ok',data}:{code:500,msg:'获取失败'};
        res.send(response)
    },
    // 获取分页数据的方法
    getPostsByPage(req,res){
        // console.log(res);
        
        // 获取分页数据需要从浏览器接受两个数据，页面和页面容量
      let {pageIndex,pageSize}=req.query;
    //   console.log(req.query);
      
      postModel.getPostsByPage(pageIndex,pageSize,data=>{
        //   console.log(data);
          
        let response=data instanceof Array?{code:200,msg:'ok',data}:{code:500,msg:'获取失败'};
        postModel.getPostCount(result=>{
            result?response.total=Math.ceil(result.total/pageSize):''
            res.send(response)
        }) 
      })
    }
}