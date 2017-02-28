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
    table.enu('location', ['home', 'work', 'anywhere'])
      .defaultTo('anywhere')
      .notNullable();
    table.integer('required_time')
      .notNullable();
    table.boolean('dividable')
      .notNullable()
      .defaultTo(false);
    table.integer('priority')
      .notNullable();
    table.timestamp('completed_at').defaultTo(null);
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};
