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
    table.text('description')
      .notNullable()
      .defaultTo('');
    table.integer('required_time')
      .notNullable();
    table.integer('total_time')
      .defaultTo(0)
      .notNullable();
    table.integer('priority')
      .notNullable();
    table.timestamp('completed_at').defaultTo(null);
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};