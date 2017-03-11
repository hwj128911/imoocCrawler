var Db = require('../Db');

Db.clearImoocs(function (err) {
    if (err) {
        console.log(err);
    } else {

        console.log('clear imoocs successful');
    }
});