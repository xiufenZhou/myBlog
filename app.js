var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Content-Type", "text/html;charset=utf-8");
    next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.connect("mongodb://localhost/myblog", {}, function(err) {
    if(err){
        console.error('Mongoose default connection callback, err:' + err);
    }
});

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' );
});
mongoose.connection.on('error',function (err) {
    console.error('Mongoose default connection open to ',err );
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
mongoose.connection.once('open', function () {
    console.log('connected to mongodb!');
});


module.exports = app;
