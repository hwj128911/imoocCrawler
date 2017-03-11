var Db = require('../Db');

Db.clearAnswers(function (err) {
    if (err) {
        console.log(err);
    } else {

        console.log('clear answers successful');
    }
});