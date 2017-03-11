var mongoose = require('mongoose');
var Student = require('../app/modules/student');
var Imooc = require('../app/modules/imooc');
var Answer = require('../app/modules/answer');
var UpdateTime = require('../app/modules/updateTime');
var moment = require('moment');
moment.locale('zh-cn');

mongoose.connect('mongodb://localhost:27017/webstudy');

/**
 * 清空更新时间
 *
 * @param {function} callback
 */
function clearUpdateTime(callback) {
    UpdateTime.remove({}, function (err) {
        if (callback) {
            callback(err);
        }
    })
}

/**
 * 清空回答信息
 *
 * @param {function} callback
 */
function clearAnswers(callback) {
    Answer.remove({}, function (err) {
        if (callback) {
            callback(err);
        }
    })
}

/**
 * 清空学生信息
 *
 * @param {function} callback
 */
function clearStudents(callback) {
    Student.remove({}, function (err) {
        if (callback) {
            callback(err);
        }
    });
}

/**
 * 清空imooc信息
 *
 * @param {function} callback
 */
function clearImoocs(callback) {
    Imooc.remove({}, function (err) {
        if (callback) {
            callback(err);
        }
    });
}


/**
 * 清空数据库
 * @param {any} callback 清空完成执行
 */
function clearDb(callback) {
    console.log('starting clear answers...');
    clearAnswers(function (err) {
        if (err) {
            console.log('is on clear answers' + err);
        }

        console.log('clear answers complete!');
        console.log('starting clear updateTime...');
        clearUpdateTime(function (err) {
            if (err) {
                console.log('is on clear updateTime' + err);
            }

            console.log('clear updateTime complete!');
            console.log('starting clear students...');

            clearStudents(function (err) {
                if (err) {
                    console.log('is on clear students' + err);
                }

                console.log('clear students complete!');
                console.log('starting clear imoocs...');

                clearImoocs(function (err) {
                    if (err) {
                        console.log('is on clear imoocs' + err);
                    }

                    console.log('clear imoocs complete!');
                    console.log('all complete!!!');
                    callback();
                });
            });

        });
    })
}


function saveStudent(student, callback) {
    var stu = new Student(student);
    stu.save(function (err, saveStu) {
        if (callback) {
            callback(err, saveStu);
        }
    });
}

function saveAnswer(answer, callback) {
    var anw = new Answer(answer);
    anw.save(function (err, saveAnw) {
        if (callback) {
            callback(err, saveAnw);
        }
    });
}

function saveImooc(imooc, callback) {
    var imc = new Imooc(imooc);
    imc.save(function (err, saveImc) {
        if (callback) {

            callback(err, saveImc);
        }
    });
}

function createUpdateTime(callback) {
    var ut = new UpdateTime();
    ut.save(function (err) {
        callback(err);
    });
}

function saveStudents(students, callback) {
    students.forEach(function (student) {
        saveStudent(student, callback);
    });
}

function saveImoocs(imoocs, callback) {
    imoocs.forEach(function (imooc) {
        saveImooc(imooc, callback);
    });
}
/**
 * 初始化数据库
 *
 * @param {any} students 初始化学生信息
 * @param {any} imoocs 初始化imooc信息
 */
function initDb(students, imoocs) {
    console.log('starting clear Db...');
    clearDb(function () {
        console.log('clear Db complete!!!');
        console.log('starting init Db...');

        var ut = new UpdateTime();
        students.forEach(function (item, index) {

            saveStudent(item, function (err, stu) {
                if (err) {
                    console.log(err);
                } else {

                }
            });

            saveImooc(imoocs[index], function (err, imc) {
                if (err) {
                    console.log(err);
                } else {

                }
            });

            saveAnswer({
                studentId: item.studentId,
                right: 0,
                littleRight: 0,
                mistake: 0,
            }, function (err, anw) {
                if (err) {
                    console.log(err);
                } else {

                }

            });

        });
        ut.save();
    });
}



/**
 * 更新学生信息
 *
 * @param {any} students 更新的学生
 * @param {any} callback 更新完成后执行
 */
function updateStudents(students, callback) {

    students.forEach(function (student) {
        updateStudent(student, callback);
    });

}

function updateStudent(student, callback) {
    UpdateTime.update({}, {
        $set: {
            student: Date.now()
        }
    }, function (err) {});

    Student.update({
        studentId: student.studentId
    }, {
        $set: student
    }, function (err) {
        if (callback) {
            callback(err, student);
        }
    });
}

/**
 * 更新imoocs信息
 *
 * @param {any} imoocs imooc信息
 * @param {any} callback 更新完成后执行
 */
function updateImoocs(imoocs, callback) {

    imoocs.forEach(function (imooc) {
        updateImooc(imooc, callback);
    });

}

/**
 * 更新imooc信息
 *
 * @param {any} imooc imooc信息
 * @param {any} callback 更新完成后执行
 */
function updateImooc(imooc, callback) {
    UpdateTime.update({}, {
        $set: {
            imooc: Date.now()
        }
    }, function (err) {});

    Imooc.update({
        imoocId: imooc.imoocId
    }, {
        $set: imooc
    }, function (err) {
        if (callback) {
            callback(err, imooc);
        }
    });


}


/**
 * 更新回答信息
 *
 * @param {any} student 回答的学生
 * @param {any} answer 回答情况
 * @param {any} callback 更新完成后执行
 */
function updateAnswer(student, answer, callback) {
    UpdateTime.update({}, {
        $set: {
            answer: Date.now()
        }
    }, function (err) {});


    Answer.update({
        studentId: student.studentId
    }, {
        $inc: answer
    }, function (err) {
        if (callback) {
            callback(err, answer);
        }
    });

}


function findStudents(query, callback) {
    Student.find(query, function (err, students) {
        if (callback) {

            callback(err, students);
        }
    });
}


function findStudent(query, callback) {
    Student.findOne(query, function (err, student) {
        if (callback) {

            callback(err, student);
        }
    });
}

function findImooc(student, callback) {
    Imooc.findOne({
        imoocId: student.imoocId
    }, function (err, imooc) {
        if (callback) {

            callback(err, imooc);
        }
    });
}

function findAnswer(student, callback) {
    Answer.findOne({
        studentId: student.studentId
    }, function (err, answer) {
        if (callback) {
            callback(err, answer);
        }
    });

}

function studentCount(callback) {
    Student.count({}, function (err, count) {
        if (callback) {

            callback(err, count);
        }
    });
}

function answerCount(callback) {
    Answer.count({}, function (err, count) {
        if (callback) {

            callback(err, count);
        }
    });
}

function imoocCount(callback) {
    Imooc.count({}, function (err, count) {
        if (callback) {

            callback(err, count);
        }
    });
}


function getUpdateTime(querys, callback) {

    UpdateTime.findOne({}, function (err, updateTime) {
        var time = {};
        querys.forEach(function (query) {
            time[query] = moment(updateTime[query]).format('LLLL');;
        });

        callback(err, time);
    });

}

function findGroup(group, callback) {
    Student.findPaginated({
        group: group
    }, function (err, result) {
        if (err) {
            Log('../error.txt', err);
        }
        callback(err, result.documents);
    });
}

/**
 * 按关键字查找学生
 *
 * @param {any} key
 * @param {any} onePageItem
 * @param {any} currentPage
 * @param {function} callback
 */
function findKey(key, onePageItem, currentPage, callback) {
    var regKey = new RegExp(key); //新建一个正则表达式，模糊匹配关键字

    Student.findPaginated({
        name: regKey
    }, function (err, result) {
        if (err) {
            console.log('is on findKey' + err);
        }
        callback(err, result.documents, result.totalPages);
    }, onePageItem, currentPage);
}

module.exports = {
    clearUpdateTime: clearUpdateTime,
    clearAnswers: clearAnswers,
    clearStudents: clearStudents,
    clearImoocs: clearImoocs,
    clearDb: clearDb,
    initDb: initDb,
    saveStudent: saveStudent,
    saveAnswer: saveAnswer,
    saveImooc: saveImooc,
    saveStudents: saveStudents,
    saveImoocs: saveImoocs,
    updateStudents: updateStudents,
    updateStudent: updateStudent,
    updateImoocs: updateImoocs,
    updateImooc: updateImooc,
    updateAnswer: updateAnswer,
    findStudents: findStudents,
    findStudent: findStudent,
    findImooc: findImooc,
    findAnswer: findAnswer,
    studentCount: studentCount,
    answerCount: answerCount,
    imoocCount: imoocCount,
    getUpdateTime: getUpdateTime,
    findGroup: findGroup,
    findKey: findKey
}