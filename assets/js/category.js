// 这是浏览器使用的js
// 1 展示所有的分类数据
// 1.1 直接发送ajax请求，获取所有的分类数据
$.ajax({
    type: 'get',
    url: "/admin/category/getAllCategory",
    success(res) {
        // console.log(res);
        
        if (res.code === 200) {
            // 使用模板引擎导入数据
            let html = template('tp', res.data);
            $('tbody').html(html);
        }
    }
});

// 显示和隐藏待选区的图标
$('.tubiao-container').on('click', function () {
    $('.tubiao-select').toggle();
})

// 委托的方式给待选择的图标注册点击事件
$('.tubiao-select').on('click','.fa', function () {
    let classname = $(this).attr('class');
    $('.current>.fa').attr('class', classname);
})

// 先获取表单
let nameInput = $('#name');
let slugInput = $('#slug');
let classBtn = $('.current > .fa');
// 给添加按钮注册点击事件
$("#btn-add").on('click', function () {
    if (nameInput.val().trim().length === 0) {
        $('#modal-msg').text('用户名不能为空');
        $('#modelId').modal();
        return;
    }
    if (slugInput.val().trim().length === 0) {
        $('#modal-msg').text('slug不能为空');
        $('#modelId').modal();
        return;
    }

    // 收集表单数据，提交到服务器，发送ajax请求
    let data={
        name:nameInput.val(),
        slug:slugInput.val(),
        classname: classBtn.attr('class').substring(3)
    }

    // 发送ajax请求
    $.ajax({
        type:'post',
        url:"/admin/category/addNewCategory",
        data,
        success(res){
            console.log(res);
            if(res.code===200){
                $('#modal-msg').text('新增成功');
                $('#modelId').modal(); 
                // 如果成功了，要在右边的表格里面，新增一条，
                // 可以要求服务器在新增完成的同时，返回新增的数据
                if(res.data){
                    let html = `<tr data-id="${res.data.id}">
                    <td class="text-center"><input type="checkbox"></td>
                    <td>${res.data.name}</td>
                    <td>${res.data.slug}</td>
                    <td>
                        <i class="fa ${res.data.classname}"></i>
                    </td>
                    <td class="text-center">
                      <a href="javascript:;" class="btn btn-info btn-xs">编辑</a>
                      <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                    </td>
                  </tr>`;
                  // 把html追加到tbody里面
                    $('tbody').append(html);
                  }
            } 
        }
    });
})