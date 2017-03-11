var Index = require('../app/controller/index');
var Rollcall = require('../app/controller/rollcall');
var User = require('../app/controller/user');

module.exports = function (app) {

    //main
    app.get('/', Index.index);
    app.get('/search', Index.search);

    //rollcall
    app.get('/rollcall', User.check,Rollcall.main);
    app.post('/rollcall/answer', User.check,Rollcall.answer);

    //user
    app.get('/login',User.login);
    app.post('/loginAuthorization',User.authorization);


}