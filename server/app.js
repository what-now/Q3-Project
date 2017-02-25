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
const jwt = require('jsonwebtoken');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '..', 'auth'),{index:false}))
app.use(express.static(path.resolve(__dirname, '..', 'build'),{index:false}))

app.use('/api', require('./api/api'));

// app.get('*', (req, res) => {
//   console.log('this is a test');
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// });
//
app.use('*', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err) => {
    console.log(err);
    err
    ? res.sendFile('index.html', {root: path.resolve(__dirname, '..', 'auth', 'public')})
    : res.sendFile('index.html', {root: path.join(__dirname, '/../', 'build')})
  })
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
