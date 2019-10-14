// 给按钮注册点击事件
$('#btn').on('click', function () {
  // 表单验证 
  // 邮箱验证 用正则表达式来验证邮箱格式是否正确 百度即可
  let reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
  // 获取邮箱输入框的内容
  let email = $('#email').val()
  if (!reg.test(email)) {
    $('#modelId').modal();
    return
  }
  let data = $('.login-wrap').serialize();
  $.ajax({
    url: '/admin/user/userLogin',
    type: 'post',
    data,
    success(res) {
      //  console.log(res);

      if (res.code == 200) {
        $('.container-fluid').text('登陆成功');
        $('#modelId').modal();
        // 把带回的头像和昵称存储到本地存储里面
        localStorage.setItem('avatar', res.data.avatar);
        localStorage.setItem('nickname', res.data.nickname);
        isLogin = true;
      } else {
        $('.container-fluid').text('登陆失败');
        $('#modelId').modal();
      }
    }
  })
})

// 定义一个变量记录登陆失败还是成功
let isLogin = false;
// 点击关闭或者是确定的时候跳转到主页
$('.modal-footer').on('click', function () {
  // 判断登陆是否成功，如果成功就跳转到主页
  if (isLogin) {
    location.href = 'http://localhost:8787/admin/index.html'
  }
})