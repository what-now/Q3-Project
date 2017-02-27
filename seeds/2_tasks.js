
exports.seed = function(knex, Promise) {
  return knex('tasks').del()
    .then(() => {
      return knex('tasks').insert([{
        id: 1,
        user_id: 1,
        title: 'Do laundry',
        description: 'make sure to clean grab kitchen towels',
        location: 'home',
        required_time: 60,
        total_time: 30,
        priority: 1,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
        completed_at: null
      }, {
        id: 2,
        user_id: 1,
        title: 'read knex documentation',
        description: 'take notes, write your own documenation to help with understanding',
        location: 'anywhere',
        required_time: 120,
        total_time: 30,
        priority: 3,
        created_at: new Date('2016-10-15 14:26:16 UTC'),
        updated_at: new Date('2016-10-20 14:26:16 UTC'),
        completed_at: null
      }, {
        id: 3,
        user_id: 2,
        title: 'call grandmother',
        description: 'make sure to mention wedding anniversary celebration',
        location: 'home',
        required_time: 30,
        total_time: 0,
        priority: 2,
        created_at: new Date('2017-02-13 14:26:16 UTC'),
        updated_at: new Date('2017-02-14 14:26:16 UTC'),
        completed_at: null
      }, {
        id: 4,
        user_id: 2,
        title: 'study more react',
        description: 'checkout this article',
        location: 'anywhere',
        required_time: 120,
        total_time: 40,
        priority: 3,
        created_at: new Date('2017-01-15 14:26:16 UTC'),
        updated_at: new Date('2017-01-20 14:26:16 UTC'),
        completed_at: null
      }]);
    })
    .then(() => {
      return knex.raw (
        "SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks));"
      )
    });
};
