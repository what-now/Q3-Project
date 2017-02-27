const router = require('express').Router();
const knex = require('../../knex');
const bcrypt = require('bcrypt');
const boom = require('boom');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
  const { email, name } = req.body
  const password = req.body.password1;

  knex('users').where('email', email).then(arr => {
    if (arr.length) {
      throw boom.badRequest('Email already exists');
    }
    return bcrypt.hash(password, 12)
  }).then(hash => {
    const user = { email, h_pw: hash, name}
    return knex('users').insert(user, '*')
  }).then(arr => {
    const registeredUser = arr[0]
    delete registeredUser.h_pw

    const claim = { id: registeredUser.id };
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '7 days'
    });

    res.cookie('token', token, {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      secure: router.get('env') === 'production'
    })

    res.send(registeredUser)
  })
  .catch((err) => {
    console.log('in user.js: ', err);
  })
  // .catch((err) => next(err))
})

module.exports = router;
