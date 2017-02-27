'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const app = express();

app.use(
  require('morgan')('dev'),
  require('body-parser').json(),
  require('cookie-parser')()
);

app.use(express.static(path.resolve(__dirname, '..', 'auth'), {index:false}))
app.use(express.static(path.resolve(__dirname, '..', 'build'), {index:false}))

app.use('/api', require('./api/api'));

const jwt = require('jsonwebtoken');

app.get('*', function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err) => {
    err
    ? res.sendFile('index.html', {root: path.resolve(__dirname, '..', 'auth', 'public')})
    : res.sendFile('index.html', {root: path.join(__dirname, '..', 'build')})
  })
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err.output : {}
  console.log(err)
  res.status(err.status || 500)
  res.json(err)
});

module.exports = app;
