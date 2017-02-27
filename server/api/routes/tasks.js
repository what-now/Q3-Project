const router = require('express').Router();
const jwt = require('jsonwebtoken')
const knex = require('../../knex');

const auth = function (req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(err);
    }

    req.claim = payload;

    next();
  });
};

router.get('/', auth, (req, res, next) => {
  const id = req.claim.id

  knex('tasks').where('user_id', id).then(arr => {
    res.send(arr)
  })
})

router.post('/', auth, (req, res, next) => {
  const id = req.claim.id
  console.log(req.body);
  res.send('check')
})

module.exports = router;
