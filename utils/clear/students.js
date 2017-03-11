var Db = require('../Db');

Db.clearStudents(function (err) {
    if (err) {
        console.log(err);
    } else {

        console.log('clear students successful');
    }
});