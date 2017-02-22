'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', (table) => {
    table.increments();
    table.integer('task_id')
      .references('id')
      .inTable('tasks')
      .notNullable()
      .onDelete('CASCADE')
      .index();
    table.integer('duration')
      .notNullable()
      .defaultTo(0);
    table.boolean('finished')
      .notNullable()
      .defaultTo(false);
    table.timestamp('checked_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sessions')
};
