
exports.seed = function(knex, Promise) {
  return knex('sessions').del()
    .then(() => {
      return knex('sessions').insert([{
          id: 1,
          task_id: 1,
          duration: 20,
          finished: false
        }, {
          id: 2,
          task_id: 2,
          duration: 60,
          finished: false
        }, {
          id: 3,
          task_id: 3,
          duration: 30,
          finished: true
        }, {
          id: 4,
          task_id: 4,
          duration: 45,
          finished: false
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('sessions_id_seq', (SELECT MAX(id) FROM sessions));"
      );
    });
};
