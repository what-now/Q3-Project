'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE')
      .index();
    table.string('title')
      .notNullable()
      .defaultTo('');
    table.string('description')
      .notNullable()
      .defaultTo('');
    table.integer('required_time')
      .notNullable();
    table.integer('total_time')
      .notNullable();
    table.integer('priority')
      .notNullable();
    table.timestamp('completed_at');
    table.timestmps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};
