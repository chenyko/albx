const userModel = require('../model/user');
module.exports = {
    getLoginPage(req, res) {
        res.render('admin/login')
    },
    userLogin(req, res) {
        let { email, password } = req.body;
        userModel.getUserByEmail(email, r => {
            // 判断r是否有数据
            if (r) {
                // 判断密码是否正确
                if (r.password === password) {
                    req.session.isLogin = true;
                    res.send({
                        code: 200,
                        msg: 'ok'
                    });
                } else {
                    res.send({
                        code: 400,
                        msg: '密码错误'
                    });
                }
            }
            // 如果r不存在就代表邮箱错误
            else {
                res.send({
                    code: 400,
                    msg: '邮箱错误'
                });
            }
        })
    }
}