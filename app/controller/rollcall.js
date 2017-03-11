var Db = require('../../utils/Db');

exports.main = function (req, res) {
    if (req._m_err) {
        delete req._m_err;
        res.render('login', {
            title: "登录",
            err: 1 //没有登录
        })
    } else {
        Db.findStudents({}, function (err, students) {
            res.render('rollcall', {
                title: '点名册',
                students: students
            });
        });
    }
}

exports.answer = function (req, res) {
    if (req._m_err) {
        delete req._m_err;
        res.json({
            success: 0,
            err: "未登录"
        });
    } else {

        var answerStudent = req.body;
        Db.findStudent({
            imoocId: answerStudent.number
        }, function (err, student) {
            var anw = {};
            switch (answerStudent.answer) {
                case '0':
                    anw = {
                        right: 1
                    };
                    break;
                case '1':
                    anw = {
                        littleRight: 1
                    };
                    break;
                case '2':
                    anw = {
                        mistake: 1
                    };
                    break;
            }
            Db.updateAnswer(student, anw, function (err) {
                res.json({
                    success: 1,
                    err: err
                });
            });
        });
    }


}

exports.authorization = function (req, res, next) {
    console.log(req.session);
    if (req.session) {
        if (req.session.admin == 1) {
            req.session.admin = 1;
            next();
        }
    } else {
        res.redirect('/');
    }
}