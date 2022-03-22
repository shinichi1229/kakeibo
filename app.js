const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const User = require('./models/user');
const Receipt = require('./models/receipt');

User.sync().then(() => {
  Receipt.belongsTo(User, { foreignKey: 'createdby' });
  Receipt.sync();
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

const app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'e55be81b307c1c09', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log(user);

  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  console.log(obj);
  done(null, obj);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: true
  },
  function (email, password, done) {
    console.log(email);
    console.log(password);
    User.findOne({ where: { email: email } })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'ユーザーIDが間違っています。' });
        }
        //TODO 平文でパスワード保存しているのを暗号化する
        if (user.password !== password) {
          return done(null, false, { message: 'パスワードが間違っています。' });
        }
        return done(null, user);
      })
  }));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
