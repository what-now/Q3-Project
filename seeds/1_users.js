'use strict';

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        name: 'Hiromi',
        email: 'hiromi@galvanize.com',
        //password: ambitionz
        h_pw: '$2a$12$V6A5x.u/uqj0PrS21xRybuqjW6x7KU/bFJv6M70E1.kK.3jDYzqne'
      }, {
        id: 2,
        name: 'Brian',
        email: 'brian@galvanize.com',

        h_pw: '$2a$12$V6A5x.u/uqj0PrS21xRybuqjW6x7KU/bFJv6M70E1.kK.3jDYzqne'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      )
    });
};
