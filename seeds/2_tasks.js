
exports.seed = function(knex, Promise) {
  return knex('tasks').del()
    .then(() => {
      return knex('table_name').insert([{
        id: 1,
        user_id: 1,
        title: 'Do laundry',
        description: 'make sure to clean grab kitchen towels',
        required_time: 60,
        total_time: 30,
        priority: 1,
        previously_at: null,
        completed_at: null;
      }, {
        id: 2,
        user_id: 1,
        title: 'read knex documentation',
        description: 'take notes, write your own documenation to help with understanding',
        required_time: 120,
        total_time: 30,
        priority: 3,
        previously_at: null,
        completed_at: null;
      }, {
        id: 3,
        user_id: 2,
        title: 'call grandmother',
        description: 'make sure to mention wedding anniversary celebration',
        required_time: 30,
        total_time: 0,
        priority: 2,
        previously_at: null,
        completed_at: null;
      }, {
        id: 4,
        user_id: 2,
        title: 'study more react',
        description: 'checkout this article',
        required_time: 120,
        total_time: 40,
        priority: 3,
        previously_at: null,
        completed_at: null;
      }]);
    })
    .then(() => {
      return knex.raw (
        "SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks));"
      )
    });
};
