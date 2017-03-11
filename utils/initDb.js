var xlsx = require('xlsx');
var Db = require('./Db');
var Robot = require('../app/controller/robot');
var path = require('path');

var data_path = path.join(__dirname, '../public/data/students.xlsx');

var workbook = xlsx.readFile(data_path).Sheets['Sheet1'];
var students = xlsx.utils.sheet_to_json(workbook);

Robot(students, function (imoocs) {
    Db.clearDb(function () {
        Db.initDb(students, imoocs);
    });
});