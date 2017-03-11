var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/u/';

//学生imooc id
var ids = ['3113661'];
//课程id
var courseId = "9";

var defaultName = 'HTML+CSS基础课程';
/**
 * 异步获取网页的信息
 *
 * @param {any} url
 * @returns
 */
function getPageAsync(url) {
    return new Promise(function (resolve, reject) {
        var chunks = [];
        http.get(url, function (res) {
            //获取网页内容
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });

            res.on('end', function () {
                var body = Buffer.concat(chunks);
                resolve(body.toString());
            });

        }).on('error', function (error) {

            reject(error);
        });
    });
};

/**
 * 解析body信息
 *
 * @param {any} main
 * @returns
 */
function analysisBody(body) {

    var $ = cheerio.load(body);
    var courses = $('.course-one');

    var courseName, completePercent, useTime, chapterId, chapterTitle;
    var courseBody;
    var studyMessage;

    for (var i = 0; i < courses.length; i++) {
        if ($(courses[i]).attr('data-courseid') == courseId) {
            courseBody = courses[i];
            break;
        }
    }

    //解析学习信息
    courseName = $(courseBody).find('.study-hd a').text();
    var points = $($(courseBody).find('.study-points'));
    completePercent = points.find('.i-left').text().substr(2);
    useTime = points.find('.i-mid').text().substr(2).trim();
    var chapter = points.find('.i-right').text().split(' ');
    chapterId = chapter[0].substr(3);
    chapterTitle = chapter[1];

    studyMessage = {
        courseName: courseName || defaultName,
        completePercent: parseInt(completePercent),
        useTime: useTime,
        chapterId: chapterId,
        chapterTitle: chapterTitle
    };

    return studyMessage;
}

module.exports = function (students, callback) {
    //提取学生学习信息promise
    var fetchStudyMessage = [];

    students.forEach(function (student) {
        fetchStudyMessage.push(getPageAsync(baseUrl + student.imoocId + '/courses?sort=time&skill_id=7'));
    });

    var imoocs = [];

    Promise
        .all(fetchStudyMessage)
        .then(function (bodys) {
            bodys.forEach(function (body, index) {

                var imooc = analysisBody(body);
                imooc.imoocId = students[index].imoocId;
                imooc.studentId = students[index].studentId;
                imoocs.push(imooc);

                if (students.length == imoocs.length) {

                    callback(imoocs);
                }
            });

        });
};
