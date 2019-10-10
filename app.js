
const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');
const userRouter=require('./router/user');
const indexRouter=require('./router/index')
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
// 注册分支路由
app.use('/admin/user',userRouter);
app.use('/admin',indexRouter)
