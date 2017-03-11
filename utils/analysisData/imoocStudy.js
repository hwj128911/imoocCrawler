var Db = require('../Db');
var Robot = require('../../app/controller/robot');

Db.findStudents({}, function (err, students) {
    if (err) {
        console.log(err);
    }

    Robot(students, function (imoocs) {
        Db.imoocCount(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                if (count == 0) {
                    Db.saveImoocs(imoocs, function (err, imooc) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(imooc.studentId + 'imooc message save successful');
                        }
                    });
                } else {
                    Db.updateImoocs(imoocs, function (err, imooc) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(imooc.studentId + ' imoocs message update successful');
                        }
                    });
                }
            }
        });

    });

});