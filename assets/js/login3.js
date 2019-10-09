/* 实现注册 */
// 1 给按钮注册点击事件
$('#btn').on('click',function(){
  // 基本的表单验证
  // 比如： 是否为空 ， 比如某些特殊的要求：邮箱 - /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/
  // 验证邮箱
  let reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
  let email = $('#email').val();
  // console.log(reg.test(email));
  if(!reg.test(email)){
    // alert('请输入正确的邮箱');// alert在不同的浏览器里面样式是不一样的，而且ie里面奇丑无比，一般对于界面有要求的网站，是不会使用的
    $('#modelId').modal();
    return;
  }
  // 2 收集表单数据
  let data = $('.login-wrap').serialize(); // jq里面封装好的收集用户表单数据的方法
  // serialize方法收集表单数据的原理是根据表单元素的name和value属性组成一个键值对
  // console.log(data);
  // 3 发送ajax请求
  $.ajax({
    url : '/admin/user/userLogin',
    type : 'post',
    data ,
    success(res) {
      // console.log(res);
      if(res.code === 200){
        // 登录成功
        $('.container-fluid').text('登录成功');
        $("#modelId").modal();
        isLogin = true;
      }else{
        // 提示失败
        $('.container-fluid').text('登录失败');
        $("#modelId").modal();
      }
    }
  });
});


// 定义一个变量，记录登录失败还是成功
let isLogin = false;
// 点击确定或者是关闭的时候，如果是登录成功了的，需要跳转到主页
$('.modal-footer').on('click',function(){
  // 判断是否成功，如果是成功的，就跳转
  if(isLogin){
    location.href = 'http://localhost:8787/admin/index.html' // 先到这里，因为主页的路由还没有写
  }
})