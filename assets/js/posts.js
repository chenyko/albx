$(function () {
  function getPostsByPage(pageIndex, pageSize) {
    $.ajax({
      type: "get",
      url: '/admin/posts/getPostsByPage',
      data: {
        pageIndex,
        pageSize
      },
      success(res) {

        if (res.code === 200) {
          let html = template('tp', res.data);
          $('tbody').html(html);
          makePagination(res.total);
        }
      }
    });
  }
  // getPostsByPage(1, 10);

  function makePagination(total) {
    $('#page').twbsPagination({
      totalPages: total,
      visiblePages: 5,
      first: '首页',
      last: '尾页',
      prev: '上一页',
      next: '下一页',
      initiateStartPageClick: false,
      onPageClick: function (e, p) {
        // getPostsByPage(p, 10);
        // 调用有条件筛选和分页的函数
        getPostByPageAndFilter(p, 10)
      }
    });
  }

  // 动态加载所有分类
  $.ajax({
    type: "get",
    url: "/admin/category/getAllCategory",
    success(res) {
      // 得到数据了，把数据动态的生成到下拉列表里面
      if(res.code === 200){
        // console.log(res.data);
        let html = `<option value="0">所有分类</option>`;
        // 拼接字符串，生结构
        res.data.forEach(e=>{
          html += `<option value="${e.id}">${e.name}</option>`;
        })
        // 把结构放到下拉框里面
        $('#category').html(html);
      }
    }
  });

  // 点击筛选按钮
  $('#search').on('click', function (e) {
    // button有默认提交行为，先阻止默认行为
    e.preventDefault();
    // 把分页插件摧毁，在请求回来之后，重新生成
    $('#page').twbsPagination('destroy');
    getPostByPageAndFilter(1, 10);
  });

  // 分页加获取数据的方法
  function getPostByPageAndFilter(pageIndex,pageSize){
    let category_id=$('#category').val();
    let status=$('#status').val();
    console.log(category_id,status);

    // 发送ajax请求
   $.ajax({
     type:'get',
     url:'/admin/posts/getPostsByFilter',
     data:{  pageIndex,pageSize,category_id,status },
     success(res){
       if(res.code===200){
         let html=template('tp',res.data);
         $('tbody').html(html);
         makePagination(res.total);
       }
     }  
   }) 
  };

  // 调用第一次，让页面一开始就有数据
  getPostByPageAndFilter(1, 10);

  // 把要删除的那一行放在外面
  let delTr=null;
  // 实现物理删除
  $('tbody').on('click','.del',function(){
  // 提示用户是否要删除
  $('.modal-title').text('确定要删除这篇文章吗？')
  $('#modelId').modal();
  // 获取要删除那一行
  delTr = $(this).parents('tr');
  });

  // 给确定删除按钮添加点击事件
  $('#del-sure').on('click',function(){
    // 把弹框隐藏
    $('#modelId').hide();
    let id=delTr.attr('data-id');
    // 发送ajax请求
    $.ajax({
      type:'get',
      url:'/admin/posts/deletePostById',
      data:{ id },
      success(res){
     if(res.code===200){
       delTr.remove()
      $('.modal-title').text('删除成功')
      $('#tip').modal();
     }
      }
    });
  })

})

