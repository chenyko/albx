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
  getPostsByPage(1, 10);

  function makePagination(total) {
    $('#page').twbsPagination({
      totalPages: total,
      visiblePages: 5,
      first: '首页',
      last: '尾页',
      prev: '上一页',
      next: '下一页',
      onPageClick: function (e, p) {
        getPostsByPage(p, 10);
      }
    });
  }
})

