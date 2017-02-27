const router = require('express').Router();
const knex = require('../../knex');
const bcrypt = require('bcrypt');
const boom = require('boom');

router.post('/', (req, res) => {
  const { email, password, name } = req.body

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

    res.send(registeredUser)
  })
})

module.exports = router;
