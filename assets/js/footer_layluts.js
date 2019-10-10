$(function () {
    // 实现点击夫级菜单可以实现收起子级菜单的代码
    $('.aside > ul').collapse();

    // 需要判断url是否是某些特定的页面，如果是，需要把子级菜单展开
  // 比如分类页面就需要展开子级菜单
  let start = location.href.lastIndexOf('/');

  let url = location.href.substring(start + 1);

  if(url === 'category.html'){
    $("#menu-posts").removeClass('collapse');
  }
})