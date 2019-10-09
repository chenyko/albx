module.exports={
    getIndexPage(req,res){
        // 判断是否曾经登录过主页
        // 如果登录过就让访问主页，否则强制跳转到登录页
        if(req.session.isLogin){
            res.render('admin/index')
        }else{
            res.send('<script>location.href="http://localhost:8787/admin/user/login.html"</script>')
        }
    }
}