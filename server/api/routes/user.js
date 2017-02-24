const router = require('express').Router();
const knex = require('../../knex');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  console.log('in users routew');
  const { email, password, name } = req.body

  knex('users').where('email', email).then(arr => {
    if (arr.length) {
      console.log(arr);
      throw new Error('This error')
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
