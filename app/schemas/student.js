var mongoose = require('mongoose');
var mongoosePages = require('mongoose-pages');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    picture: String,
    imoocId: String,
    group: Number,
    totalGroup: Number,
});

mongoosePages.skip(studentSchema);

module.exports = studentSchema;