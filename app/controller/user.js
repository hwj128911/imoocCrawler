exports.login = function (req, res) {
    res.render('login', {
        title: "登录"
    });
}

exports.authorization = function (req, res) {
    if (req.body.password == "") {
        req.session.admin = 1;
        res.redirect('/rollcall');
    } else {
        res.render('login', {
            title: "登录",
            err: 0 //密码错误
        })
    }
}

exports.check = function (req, res, next) {
    if (req.session.admin != 1) {
        req._m_err = 1;
    }
    next();
}