// 负责处理和文章相关的逻辑
const postModel = require('../model/posts')

module.exports = {
    getPostsPage(req, res) {
        res.render('admin/posts');
    },
    // 获取连表数据查询的方法
    getAllPosts(req, res) {
        let response = data instanceof Array ? { code: 200, msg: 'ok', data } : { code: 500, msg: '获取失败' };
        res.send(response)
    },
    // 获取分页数据的方法
    getPostsByPage(req, res) {
        // console.log(res);

        // 获取分页数据需要从浏览器接受两个数据，页面和页面容量
        let { pageIndex, pageSize } = req.query;
        //   console.log(req.query);

        postModel.getPostsByPage(pageIndex, pageSize, data => {
            //   console.log(data);

            let response = data instanceof Array ? { code: 200, msg: 'ok', data } : { code: 500, msg: '获取失败' };
            postModel.getPostCount(result => {
                result ? response.total = Math.ceil(result.total / pageSize) : ''
                res.send(response)
            })
        })
    },
    getPostAddPage(req, res) {
        res.render('admin/post-add');
        res.render('index')
    },
    getPostsByFilter(req, res) {
    // 得到条件
    let { category_id, status, pageIndex, pageSize } = req.query;
    // category_id 可能是0,0表示不根据分类进行筛选
    // status 可能是all，也是不需要根据状态进行筛选
    // 就需要判断，只要 category_id == 0 || status == 'all' 就不根据某个条件筛选

    // 需要在这里处理sql语句，然后把sql语句传递给model就行了
    let sql = `SELECT
    posts.id,posts.title,posts.created,posts.\`status\`,
    categories.\`name\`,
    users.nickname
   FROM posts
  LEFT JOIN categories ON posts.category_id = categories.id
  LEFT JOIN users ON posts.user_id = users.id`;

    let condition = ` where 1=1 `;
    // WHERE category_id = ${category_id} AND posts.\`status\`='${status}'`;
    // 判断一下 ： 如果category_id不是0，就有这个条件
    if (category_id != 0) {
      // 就是需要根据分类进行筛选
      condition += ` and category_id = ${category_id} `;
    }
    if (status != 'all') {
      // 就是需要根据状态进行筛选
      condition += ` AND posts.\`status\`='${status}' `;
    }
    // console.log(sql + condition);

    let pageQuery = ` LIMIT ${(pageIndex - 1) * pageSize},${pageSize} `;

    postModel.getPostsByFilter(sql + condition + pageQuery, data => {
      let response = data instanceof Array ? { code: 200, msg: 'ok', data } : { code: 500, msg: '获取失败' };
      // 还是需要重新获取 最大页面数，返回给 分页插件， 让它生成最大的按钮数量
      postModel.getPostCountByFilter(condition,result=>{
        response.total = Math.ceil(result.total / pageSize);
        res.send(response);
      });
    });
  }
}