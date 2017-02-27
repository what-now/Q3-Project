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

app.use(function handleErrors(err, req, res, next) {
  const { statusCode, error, message } = err.output.payload

  if (!statusCode) {
    console.error(err)
  }
  res.status(statusCode || 500)
  res.send(message)
});

module.exports = app;
