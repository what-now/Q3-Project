const router = require('express').Router();
const knex = require('../../knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', (req, res, next) => {
  const {email, password} = req.body

  let user
  knex('users').where('email', email).then(arr => {
    if (!arr.length) {
      throw new Error('')
    }

    user = arr[0]
    return bcrypt.compare(password, user.h_pw)
  }).then((result) => {
    if (!result) {
      throw new Error('bcrypt failed')
    }

    delete user.password

    const claim = {id: user.id}
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '120 days',
    });

    res.cookie('token', token, {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 3600000 * 24 * 120),
      secure: router.get('env') === 'Production',
    }).send(user);
  }).catch(err => next(err));
});

module.exports = router;
