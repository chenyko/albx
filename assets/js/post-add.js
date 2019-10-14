$(function () {
  CKEDITOR.replace('content');
  // 实现上传
  //   file按钮，如果是点击事件，点击了立刻就触发了，此时还没有选中文件，点击事件是无法得到文件的
  //   需要注册 change 事件 - 这个事件是指  表单元素的value属性  发生变化的事件
  $('#feature').on('change', function () {
    if (!this.files) {
      return
    };
    // 如果有文件就上传文件
    let file = this.files[0];
    // 使用FormData把文件变为流形式
    let fd = new FormData();
    // console.log(file);
    
    fd.append('feature', file);

    // 发送ajax请求
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/admin/posts/uploadFeature');
    xhr.send(fd);
    xhr.onreadystatechange = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        let res = JSON.parse(xhr.responseText);
        if (res.code === 200) {
          $('.thumbnail').show().attr('src', res.src);
          $('#imgSrc').val(res.src)
        }
      }
    }

  });

  // 分类动态加载
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

  // 给保存按钮添加点击事件
  $('#btn-save').on('click', function () {
    // 基本的表单验证
    if ($('#title').val().trim().length === 0 || $("#content").val().trim().length) {
      $('#modal-msg').text('标题或者内容不能为空');
      $('#modelId').modal();
    };
    // 富文本编辑器里面的内容更新回文本域
  CKEDITOR.instances.content.updateElement();
  // 收集表單數據
  let data = $('form').serialize()

  // 發送ajax請求
  $.ajax({
    type: 'post',
    url: '/admin/posts/addNewPost',
    data,
    seccuss(res) {
      if (res.code === 200) {
        $('#modal-msg').text('操作成功');
        $('#modelId').modal();
      }
    }
  })
  })
  



})