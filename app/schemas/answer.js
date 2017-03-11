var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var answerSchema = new mongoose.Schema({
    studentId: String,
    right: Number,
    littleRight: Number,
    mistake: Number,
});


module.exports = answerSchema;