const router = require('express').Router();
const jwt = require('jsonwebtoken')
const knex = require('../../knex');
const boom = require('boom');

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
  const id = req.claim.id;

  const sessions = {};

  knex('tasks').innerJoin('sessions', 'tasks.id', 'sessions.task_id')
  .where('tasks.user_id', id).select('sessions.id', 'task_id', 'duration', 'sessions.created_at').then(arr => {
    arr.reduce((acc, obj) => {
      acc[obj.task_id] = acc[obj.task_id] || [];
      acc[obj.task_id].push(obj);
      return acc;
    }, sessions);

    return knex('tasks').where('user_id', id).then(arr => {
      arr.map(obj => {
        obj.sessions = sessions[obj.id] || [];
        obj.total_time = obj.sessions.reduce((sum, ssn) => sum + ssn.duration, 0);
        return obj;
      })

      res.send(arr);
    })
  })
});

router.post('/', auth, (req, res, next) => {
  const user_id = req.claim.id;
  const { title, description, required_time, location, priority, dividable } = req.body;
  const task = { user_id, title, description, dividable, required_time, location, priority };

  console.log('in tasks post');

  knex('tasks').insert(task, '*').then(arr => {
    res.send(arr[0]);
  });

});

router.patch('/:id', auth, (req, res, next) => {
  const id = req.params.id;

  knex('tasks').where('id', id).then(arr => {
    const task = {
      required_time: +arr[0].required_time + (+req.body.required_time || 0),
      completed_at: req.body.completed_at || null
    }

    return knex('tasks').where('id', id).update(task, '*')
  }).then(arr => {
    res.send(arr[0])
  })
});

router.patch('/edit/:id', auth, (req, res, next) => {
  const id = req.params.id;
  const { title, description, required_time, location, priority, dividable } = req.body;
  const updated = { title, description, required_time, location, priority, dividable };

  knex('tasks')
    .where('id', id)
    .update(updated, '*')
    .then((arr) => {
      res.send(arr[0])
    })
});

router.delete('/:id', auth, (req, res, next) => {
  knex('tasks')
    .del('*')
    .where('id', req.params.id)
    .then((arr) => {
      res.end();
    })
    // .catch((err) => {
    //   console.log('what the hell!');
    // })
});

module.exports = router;
