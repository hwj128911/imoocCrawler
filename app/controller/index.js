var Db = require('../../utils/Db');

/**
 * 学生列表排序函数
 *
 * @param {any} a
 * @param {any} b
 * @returns
 */
function cmp(a, b) {
    if (b.imooc.completePercent == a.imooc.completePercent) {

        if (a.answer.right == b.answer.right) {

            if (b.answer.littleRight == a.answer.littleRight) {

                if (b.answer.mistake == a.answer.mistake) {

                    return a.student.imoocId - b.student.imoocId;
                } else {

                    return a.answer.mistake - b.answer.mistake;
                }
            } else {
                return b.answer.littleRight - a.answer.littleRight;
            }

        } else {
            return b.answer.right - a.answer.right;
        }
    } else {

        return b.imooc.completePercent - a.imooc.completePercent;
    }
}

/**
 * 获取学生的信息
 *
 * @param {any} students 需要获取的学生
 * @param {any} callback 获取完毕执行
 */
function getMessage(students, callback) {
    var message = {
        main: [],
        updateTime: "",
    };
    if (students.length == 0) {
        Db.getUpdateTime(["imooc"], function (err, time) {
            message.updateTime = time.imooc;
            callback(err, message);
        });

    } else {
        students.forEach(function (stu) {

            Db.findImooc(stu, function (err, imc) {
                Db.findAnswer(stu, function (err, anw) {
                    message.main.push({
                        student: stu,
                        imooc: imc,
                        answer: anw
                    });
                    if (message.main.length == students.length) {
                        Db.getUpdateTime(["imooc"], function (err, time) {
                            message.updateTime = time.imooc;
                            message.main.sort(cmp);
                            callback(err, message);
                        });
                    }
                });

            });
        });
    }
}


exports.index = function (req, res) {
    var g = req.query.g || 1;
    Db.findGroup(g, function (err, students) {
        if (err) {
            console.log(err);
        }

        getMessage(students, function (err, message) {
            res.render('index', {
                title: 'Web学习情况',
                message: message,
                currentPage: g,
                totalPages: message.main[0].student.totalGroup,
                updateTime: message.updateTime
            });
        })


    });
}

exports.search = function (req, res) {
    var queryName = req.query.q;
    var g = req.query.g || 1;
    if (queryName) {
        Db.findKey(queryName, 10, g, function (err, students, totalPages) {
            if (err) {
                console.log(err);
            }
            getMessage(students, function (err, message) {

                res.render('index', {
                    title: 'Web学习情况',
                    message: message,
                    totalPages: totalPages,
                    updateTime: message.updateTime,
                    currentPage: g,
                    isSearch: true,
                    queryName: queryName
                });
            });
        });

    } else {
        res.redirect('/');
    }

}