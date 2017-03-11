var Db = require('../Db');

Db.clearDb(function(err){
    if(err){
        console.log(err);
    }
    console.log('clear complete');
});