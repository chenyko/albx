// 负责处理和分类相关的逻辑

const categoryModel = require('../model/category');

module.exports = {
  getCategoryPage(req, res) {
    res.render('admin/categories')
  },
  // 处理所有分类数据的请求
  getAllCategory(req, res) {
    categoryModel.getAllCategory(data => {
      let response = data instanceof Array ? { code: 200, mag: 'ok', data } : { code: 500, mag: '获取出错' };
      res.send(response);
    })
  },
  // 新增方法
  addNewCategory(req, res) {
    let { classname, name, slug } = req.body;
    categoryModel.addNewCategory(slug, name, classname, result => {
      // 如果新增成功了，同时把新增成功的数据带回浏览器，显示在页面上
      if (result.affectedRows === 1) {
        let { insertId } = result;
        categoryModel.getCategoryById(insertId, r => {
          if (r) {
            res.send({
              code: 200,
              msg: '新增并且获取成功',
              data: r
            });
          } else {
            res.send({
              code: 200,
              msg: '新增成功了，但是获取数据的时候失败了，请刷新'
            });
          }
        })
      } else {
        // 新增失败
        res.send({
          code: 500,
          msg: '新增失败'
        });
      }
    })

  }
}