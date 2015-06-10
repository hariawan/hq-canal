var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var flash        = require('connect-flash');
var session      = require('express-session');

var validator    = require('validator');
var helpers      = require('view-helpers');

var routes       = require('./routes/index');

var pkg          = require('./package.json');

var app          = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'HQ-Awesome!',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(helpers(pkg.name));

app.use(function(req, res, next) {
  res.locals.fullUrl     = req.protocol + "://" + req.get('host') + req.url;
  res.locals.validator   = validator;
  res.locals.pkg         = pkg;
  res.locals.env         = app.get('env');

  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
