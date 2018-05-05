require('./app_server/models/db')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const informacionRouter = require('./app_server/routes/informacion');
const participantesRouter = require('./app_server/routes/participantes');
const leaderboardRouter = require('./app_server/routes/leaderboard');
const anunciosRouter = require('./app_server/routes/anuncios');
const fixtureRouter = require('./app_server/routes/fixture');
const equiposFormRouter = require('./app_server/routes/integrantesForm');
const integrantesFormRouter = require('./app_server/routes/equiposForm');
const apiRouter = require('./app_server/routes/api');
const loginRouter = require('./app_server/routes/login');

const app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/informacion', informacionRouter);
app.use('/participantes', participantesRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/anuncios', anunciosRouter);
app.use('/fixture', fixtureRouter);
app.use('/integrantesForm', equiposFormRouter);
app.use('/integrantesForm', integrantesFormRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);

// express validator middleware
app.use(expressValidator()); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
