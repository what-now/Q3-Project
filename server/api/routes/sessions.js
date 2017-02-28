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

  knex('sessions').innerJoin('tasks', 'sessions.task_id', 'tasks.id')
  .where('tasks.user_id', id).then(arr => {
    res.send(arr)
  })
})

router.post('/', auth, (req, res, next) => {
  const { task_id, duration, finished } = req.body;
  const session = { task_id, duration, finished };

  knex('sessions')
    .insert(session, '*')
    .then((arr) => res.send(arr[0]))
    .catch((err) => next(err))
})

module.exports = router;
