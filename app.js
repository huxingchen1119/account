var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {DBPORT,DBHOST,DBNAME} = require('./config/config')

var indexRouter = require('./routes/web/index');
var accountRouter = require('./routes/api/account');
var authRouter = require('./routes/web/auth')
const authApiRouter = require('./routes/api/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name:'sid',
  secret:'thea',
  saveUninitialized: false,
  resave: true,
  store: MongoStore.create({
      mongoUrl:`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie:{
      httpOnly:true,
      maxAge:1000 * 60 *60 * 7//session expiration time
  }
}));

app.use('/', indexRouter);
app.use('/api', authApiRouter);
app.use('/api', accountRouter);
app.use('/',authRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404');
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

module.exports = app;
