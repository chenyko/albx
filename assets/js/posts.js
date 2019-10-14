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
      if (res.code === 200) {
        // console.log(res.data);
        let html = `<option value="0">所有分类</option>`;
        // 拼接字符串，生结构
        res.data.forEach(e => {
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
  function getPostByPageAndFilter(pageIndex, pageSize) {
    let category_id = $('#category').val();
    let status = $('#status').val();
    console.log(category_id, status);

    // 发送ajax请求
    $.ajax({
      type: 'get',
      url: '/admin/posts/getPostsByFilter',
      data: { pageIndex, pageSize, category_id, status },
      success(res) {
        if (res.code === 200) {
          let html = template('tp', res.data);
          $('tbody').html(html);
          makePagination(res.total);
        }
      }
    })
  };

  // 调用第一次，让页面一开始就有数据
  getPostByPageAndFilter(1, 10);

  // 把要删除的那一行放在外面
  let delTr = null;
  // 实现物理删除
  $('tbody').on('click', '.del', function () {
    // 提示用户是否要删除
    $('.modal-title').text('确定要删除这篇文章吗？')
    $('#modelId').modal();
    // 获取要删除那一行
    delTr = $(this).parents('tr');
  });

  // 给确定删除按钮添加点击事件
  $('#del-sure').on('click', function () {
    // 把弹框隐藏
    $('#modelId').hide();
    let id = delTr.attr('data-id');
    // 发送ajax请求
    $.ajax({
      type: 'get',
      url: '/admin/posts/deletePostById',
      data: { id },
      success(res) {
        if (res.code === 200) {
          delTr.remove()
          $('.modal-title').text('删除成功')
          $('#tip').modal();
        }
      }
    });
  });

  // 批量删除
  // 全选
  $('thead input[type=checkbox]').on('click', function () {
    // 让下面的选择框的状态和我的状态一样
    let status = $(this).prop('checked', status);
    // 如果是全选需要显示批量删除的按钮
    status && $('#mutiple').show();
  });

  // 点选操作
  $('tbody').on('click', 'input[type=checkbox]', function () {
    // 如果下面多選框的勾選數和點擊批量刪除按鈕勾選數一樣 也是全選
    let isChekALl = $('tbody input[type=checkbox]').length === $('tbody input[type=checkbox]:checked').length;
    $('thead input[type=checkbox]').prop('checked', isChekALl);
    // 如果勾選數超過1個，也顯示批量刪除的按鈕
    $('tbody input[type=checkbox]:checked').length > 1 ? $('#mutiple').show() : $('#mutiple').hide();
  });

  // 點擊批量刪除按鈕
  $('#mutiple').on('click',function(){
    // 把所有勾选的文字全都删除
    let ids = [];
    // 获取所有勾选的id
    $('tbody input[type=checkbox]:checked').each((i,e)=>{
      console.log(i)
      // e是按钮，而id存储在tr身上，要从tr那里得到id
      let id = $(e).parents('tr').attr('data-id');
      ids.push(id);
    });
    // 把所有的id发送回服务器
    $.ajax({
      type: "get",
      url: "/admin/posts/deletePostByMutiple",
      data: {ids},
      success(res) {
        //提示用户，然后更新数据
        if(res.code === 200){
          $('tbody input[type=checkbox]:checked').parents('tr').remove();
        }
      }
    });
  })
});
