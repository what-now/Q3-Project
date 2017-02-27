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
  const user_id = req.claim.id
  const { title, description, required_time, location, priority } = req.body

  const task = { user_id, title, description, required_time, location, priority, total_time: 0 }

  knex('tasks').insert(task, '*').then(arr => {
    res.send(arr[0])
  })


})

module.exports = router;
