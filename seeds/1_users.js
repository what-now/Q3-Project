'use strict';

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        name: 'Hiromi'
        email: 'hiromi@galvanize.com',
        h_pw: '$2a$12$LaKBUi8mCFc/9LiCtvwcvuNIjgaq9LJuy/NO.m4P5.3FP8zA6t2Va'
      }, {
        id: 2,
        name: 'Brian',
        email: 'brian@galvanize.com',
        h_pw: '$2a$12$LaKBUi8mCFc/9LiCtvwcvuNIjgaq9LJuy/NO.m4P5.3FP8zA6t2Va'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    });
};
