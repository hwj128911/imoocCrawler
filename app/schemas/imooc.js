var mongoose = require('mongoose');

var imoocSchema = new mongoose.Schema({
    studentId:String,
    imoocId: Number,
    courseName: String,
    completePercent: Number,
    useTime: String,
    chapterId: String,
    chapterTitle: String,
});


module.exports = imoocSchema;