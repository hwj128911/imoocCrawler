var pug = require('pug');
var express = require('express');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var Db = require('./utils/Db');
var app = express();

app.set('views', './app/views/pages/');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('./public'));
// set cookie session
app.use(cookieSession({
    name: 'session',
    keys: ['admin'], //set secret
    maxAge: 30*60*1000
}));

require('./config/routes')(app);


app.use(function (req, res, next) {
    res.render('404');
    next();
});

console.log('listen at 5000');
app.listen(5000);