var fs = require('fs');
var xlsx = require('xlsx');
var path = require('path');
var Db = require('../Db');

var data_path = path.join(__dirname, '../../public/data/students/students.xlsx');
console.log(data_path);

var workbook = xlsx.readFile(data_path).Sheets['Sheet1'];
var students = xlsx.utils.sheet_to_json(workbook);


Db.clearStudents(function (err) {
    if (err) {
        console.log(err);
    } else {
        students.forEach(function (item) {

            Db.saveStudent(item, function (err, saveStu) {
                if (err) {
                    console.log(err);
                }

                console.log(saveStu.name + 'save success');
            });
        });
    }
});