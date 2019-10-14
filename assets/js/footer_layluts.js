$(function () {
    // 实现点击夫级菜单可以实现收起子级菜单的代码
    $('.aside > ul').collapse();

    // 需要判断url是否是某些特定的页面，如果是，需要把子级菜单展开
  // 比如分类页面就需要展开子级菜单
  let start = location.href.lastIndexOf('/');

  let url = location.href.substring(start + 1);

  if(url === 'category.html'|| url==='posts.html'||url.startsWith('post-add.html')){
    $("#menu-posts").removeClass('collapse');
  }

  // 从本地存储中把头像和昵称取出来，更新到页面里面
  let avatar = localStorage.getItem('avatar');
  let nickname = localStorage.getItem('nickname');
  $('.avatar').attr('src',avatar);
  $('.aside .name').text(nickname);

  // 在这里实现退出的功能
  $('#logout').on('click',function(){
    $.ajax({
      type:'get',
      url:'/admin/user/logout',
      success(res){
        if(res.code===200){
          location.href='/admin/user/login.html'
        }
      }
    });
  })
  
})