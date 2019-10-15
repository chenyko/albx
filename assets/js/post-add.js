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



  // 现在是新增和编辑使用同一个页面，我们就需要明确，这个页面现在到底是新增还是编辑
  // 新增不会带id过来，编辑url里面是有id
  let id = location.search.substring(4);
  //  console.log(id);
  if (id) {
    // 编辑
    // 发送ajax请求获取旧的数据
    $.ajax({
      type: 'get',
      url: '/admin/posts/getPostsById',
      data: { id },
      success(res) {
        // 把id放在一个隐藏域里面
        $('form').append(`<input type="hidden" name="id" value="${id}">`);
        // 把数据填在表单里面
        $('#title').val(res.data.title);
        $('#content').val(res.data.content);
        // 把文本域变成富文本
        CKEDITOR.replace('content');
        $("#slug").val(res.data.slug);
        $("#title").val(res.data.title);
        // 处理图片
        $('.thumbnail').attr('src', res.data.feature).show();
        // 把图片地址存储到隐藏域的value里面
        $('#imgSrc').val(res.data.feature);
        // 设置下拉框的valu，就可以实现下拉框某个选项被选中
        $('#category').val(res.data.category_id);
        // 设置时间 时间控件的格式是：2019-10-13T12:12 服务器需要的是：1970-01-19T03:20:55.000Z
        // 把多余的部分切掉 长度是16位
        // console.log(res.data.created);
        $('#created').val(res.data.created.substring(0,16))
      
         
        // 设置状态
        $('#status').val(res.data.status);
      }
    });

    // 给保存按钮添加点击事件
    $('#btn-save').on('click', function () {
      //     // 因为使用了富文本，需要先摧毁富文本
      CKEDITOR.instances.content.updateElement();
      //     // 收集表单数据
      let data = $('form').serialize();
      console.log(data);
      
      // 发送ajax请求
      $.ajax({
        type: "post",
        url: "/admin/posts/editPostById",
        data,
        success(res) {
          // console.log(res);

        }

      })

    });

  } else {
    //  新增
    // 给保存按钮添加点击事件
    $('#btn-save').on('click', function () {
      // 基本的表单验证
      // if ($('#title').val().trim().length === 0 || $("#content").val().trim().length) {
      //   $('#modal-msg').text('标题或者内容不能为空');
      //   $('#modelId').modal();
      // };
      // 富文本编辑器里面的内容更新回文本域
      CKEDITOR.instances.content.updateElement();
      // 收集表單數據
      let data = $('form').serialize()
console.log(data);

      // 發送ajax請求
      $.ajax({
        type: 'post',
        url: '/admin/posts/addNewPost',
        data,
        success(res) {
          if (res.code === 200) {
            console.log(res)
            $('#modal-msg').text('操作成功');
            $('#modelId').modal();
          }
        }
      })
    })
  };
})