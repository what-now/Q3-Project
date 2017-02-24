'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser())

// app.use(express.static(path.join(__dirname, '/../', 'public')));
app.use(express.static(path.resolve(__dirname, '..', 'public-auth')));
// app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/api', require('./api/api'));

// app.get('*', (req, res) => {
//   console.log('this is a test');
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });
//
app.use('*', function(req, res, next) {
  res.sendFile('index.html', {root: path.resolve(__dirname, '..', 'public-auth')})
  // res.sendFile('index.html', {root: path.join(__dirname, '/../', 'public')})
});

// app.use(function(req, res, next) {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// });

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  console.log(err)
  res.status(err.status || 500)
  res.json(err)
});

module.exports = app;
