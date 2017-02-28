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
  .where('tasks.user_id', id).select('sessions.id', 'sessions.duration', 'sessions.finished', 'feedback', 'sessions.task_id', 'tasks.title').then(arr => {
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

router.patch('/:id', auth, (req, res, next) => {
  const id = req.params.id

  knex('sessions').where('id', id).then(arr => {
    const current = arr[0]

    const update = {
      finished: req.body.finished || current.finished,
      feedback: req.body.feedback || current.feedback
    }

    return knex('sessions').where('id', id).update(update, '*')
  }).then(arr => res.send(arr[0]))
})

module.exports = router;
