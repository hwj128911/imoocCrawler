
var schedule = require("node-schedule");
var Robot = require('./app/controller/robot');
var Db = require('./utils/Db');
var Student = require('./app/modules/student');

var rule = new schedule.RecurrenceRule();
var hours = [];
for (var i = 0; i < 24; i++) {
	hours.push(i);
}

rule.hour = hours;
rule.minute = 0;

// 开启定时爬虫任务
var j = schedule.scheduleJob(rule, function () {
	Student.find({}, function (err, students) {
		Robot(students, function (imoocs) {
			Db.updateImoocs(imoocs, function (imooc) {

			});

		});
	});

});
