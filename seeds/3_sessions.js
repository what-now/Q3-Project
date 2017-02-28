
exports.seed = function(knex, Promise) {
  return knex('sessions').del()
    .then(() => {
      return knex('sessions').insert([
        {
          id: 1,
          task_id: 1,
          duration: 20,
          finished: false,
          feedback: new Date('2017-01-20 14:26:16 UTC')
        }, {
          id: 2,
          task_id: 2,
          duration: 60,
          finished: false,
          feedback: null
        }, {
          id: 3,
          task_id: 4,
          duration: 20,
          finished: false,
          feedback: new Date('2017-01-20 14:26:16 UTC')
        }, {
          id: 4,
          task_id: 4,
          duration: 20,
          finished: false,
          feedback: null
        }, {
          id: 5,
          task_id: 9,
          duration: 30,
          finished: false,
          feedback: new Date('2017-01-20 14:26:16 UTC')
        }, {
          id: 6,
          task_id: 9,
          duration: 40,
          finished: false,
          feedback: new Date('2017-01-20 14:26:16 UTC')
        }, {
          id: 7,
          task_id: 9,
          duration: 20,
          finished: false,
          feedback: new Date('2017-01-20 14:26:16 UTC')
        }, {
          id: 8,
          task_id: 9,
          duration: 30,
          finished: false,
          feedback: null
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('sessions_id_seq', (SELECT MAX(id) FROM sessions));"
      );
    });
};
