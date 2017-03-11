var mongoose = require('mongoose');


var updateTimeSchema = new mongoose.Schema({
    student: {type:Date,default:Date.now()},
    imooc: {type:Date,default:Date.now()},
    answer: {type:Date,default:Date.now()},
    creatTime:{type:Date,default:Date.now()}
});



module.exports = updateTimeSchema ;