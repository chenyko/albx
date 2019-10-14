
const express=require('express');
const url = require('url');
const bodyParser=require('body-parser');
const session=require('express-session');
const userRouter=require('./router/user');
const indexRouter=require('./router/index');
const categoryRouter=require('./router/category');
const commentsRouter=require('./router/comments');
const postsRouter=require('./router/posts')
const app=express();
app.listen(8787,()=>{
    console.log('http://localhost:8787');
    
});
// 处理静态资源
app.use('/assets',express.static('assets'))
// 处理图片资源
app.use('/uploads',express.static('uploads'))
// 注册body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 注册session中间件
app.use(session({
    secret: 'sblx',
    resave: false,
    saveUninitialized: false
  }));
//  设置ejs为默认的模板引擎
app.set('view engine','ejs');


// 登陆权限控制：我们判断是从session里面获取数据的，所以这个中间件要在写session注册后面，router前面
// 如果已经登陆了就执行下一个中间键，接受和处理响应请求
// 如果没有登陆过 就强制跳转到登陆页
app.use((req,res,next)=>{
  // url里面可能还带有参数，所以需要解析一下
  let {pathname}=url.parse(req.url);
  // 判断是否是登陆页面，如果是登陆页面就不需要做权限控制
  if(pathname==='/admin/user/login.html'||pathname==="/admin/user/userLogin"){
    // 执行一一个中间键
    next();
  }else{
    // 判断是否之前是否登陆过，如果登陆过session里面会有数据
    if(req.session.isLogin){
      next();
    }else{
      res.send('<script>location.href="/admin/user/login.html"</script>');
    }
  }
})

// 注册分支路由
app.use('/admin/user',userRouter);
app.use('/admin',indexRouter);
app.use('/admin/category',categoryRouter);
app.use('/admin/comments',commentsRouter);
app.use('/admin/posts',postsRouter);