var mongoose = require('mongoose');
var UpdateTimeSchema = require("../schemas/updateTime");
var UpdateTime = mongoose.model('UpdateTime',UpdateTimeSchema);

module.exports = UpdateTime;