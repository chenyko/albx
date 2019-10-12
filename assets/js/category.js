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
$('.tubiao-select').on('click', '.fa', function () {
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
    let data = {
        name: nameInput.val(),
        slug: slugInput.val(),
        classname: classBtn.attr('class').substring(3)
    }

    // 发送ajax请求
    $.ajax({
        type: 'post',
        url: "/admin/category/addNewCategory",
        data,
        success(res) {
            // console.log(res);
            if (res.code === 200) {
                $('#modal-msg').text('新增成功');
                $('#modelId').modal();
                // 如果成功了，要在右边的表格里面，新增一条，
                // 可以要求服务器在新增完成的同时，返回新增的数据
                if (res.data) {
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
                    $("#btn-cancel").trigger('click');
                }
            }
        }
    });
});

// 删除按钮点击删除事件
$('tbody').on('click', '.del', function () {
    // 获取id，把id存储到tr上，通过tr来获取id
    let id = $(this).parents('tr').attr('data-id');
    $.ajax({
        type: 'get',
        url: '/admin/category/deleteCategoryById',
        data: { id },
        success: (res) => {
            if (res.code === 200) {
                $('#modal-msg').text('操作成功');
                $('#modelId').modal();
                // 操作成功后把删除按钮换成恢复按钮
                $(this).parent().append('<a href="javascript:;" class="btn reset btn-danger btn-xs">恢复</a>');
                $(this).remove()
            }
        }
    });
});

// 把要编辑的id放在外面
let id = null;
// 把要修改的一行放在外面
let oldTr = null;
// 给编辑按钮添加点击事件
$('tbody').on('click', '.edit', function () {
    // 获取id
    oldTr = $(this).parents('tr');
    id = oldTr.attr('data-id');
    $.ajax({
        type: 'get',
        url: '/admin/category/getCategoryById',
        data: { id },
        success: (res) => {
            console.log(res);
    
            if (res.code == 200) {
                //  把根据id获取到的数据写到表单里面
                $('#name').val(res.data.name);
                $('#slug').val(res.data.slug);
                $('.current>.fa').attr('class', 'fa ' + res.data.classname);
                // 把添加按钮隐藏，把保存按钮显示
                $('.add-container').attr('hidden', true).next().attr('hidden', false);
            }

        }
    });
});
// 给保存按钮添加点击事件
$('#btn-save').on('click', function () {
    let name = $('#name').val();
    let slug = $('#slug').val();
    let classname = $('.current > .fa').attr('class').substring(3);
    // 简单的验证表单
    if (name.length===0 ||slug.length===0) {
        $('#modal-msg').text('姓名或slug不能为空');
        $('#modelId').modal();
    };
    // 发送ajax请求
    $.ajax({
        type: 'post',
        url: '/admin/category/editCateogryById',
        data: { id, name, slug, classname },
        success: (res) => {
            // 如果不成功就直接终止退出
            if (res.code !== 200) return;
            //    成功之后更新右边数据，创建一行新的数据，把旧的数据替换掉
            let newTr = `<tr data-id="${id}">
        <td class="text-center"><input type="checkbox"></td>
        <td>${name}</td>
        <td>${slug}</td>
        <td>
          <i class="fa ${classname}"></i>
        </td>
        <td class="text-center">
        <a href="javascript:;" class="edit btn btn-info btn-xs">编辑</a>
        <a href="javascript:;" class="del btn btn-danger btn-xs">删除</a>
        </td>
        </tr>`;

            // 把新的数据放在旧数据之前
            oldTr.before(newTr);
            // 把旧数据移除
            oldTr.remove();
            // 把表单里面的数据清空
            $("#btn-cancel").trigger('click');
        }
    });
});

// 给取消按钮添加点击事件 
$('#btn-cancel').on('click',function(){
    // 把输入框里面的内容清空，把图标变成默认的
    $('#name').val('');
    $('#slug').val('');
    $('.current > .fa').attr('class','fa fa-glass');
    // 把添加显示，把保存隐藏
    $('.save-container').attr('hidden', true).prev().attr('hidden', false);
});

// 给弹窗的确定按钮添加点击事件
$('.modal-footer').on('click','.btn-primary',function(){
    $('#modelId').css('display','none')
})

// 给恢复按钮添加点击事件
$('tbody').on('click', '.reset', function () {
    // 获取id，把id存储到tr上，通过tr来获取id
    let id = $(this).parents('tr').attr('data-id');
    $.ajax({
        type: 'get',
        url: '/admin/category/resetCategoryById',
        data: { id },
        success: (res) => {
            if (res.code === 200) {
                $('#modal-msg').text('操作成功');
                $('#modelId').modal();
                // 操作成功后把删除按钮换成恢复按钮
                $(this).parent().append('<a href="javascript:;" class="btn del btn-danger btn-xs">删除</a>');
                $(this).remove()
            }
        }
    });
});