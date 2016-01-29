
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('posts', function (table) {
      table.increments('id').primary();
      table.string('post',900);
      table.string('name', 250);
    }),
    knex.schema.createTableIfNotExists('comments', function (table) {
      table.increments('id').primary();
      table.string('comment',300);
      table.string('name',250);
      table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('ranking', function (table) {
      table.increments('id').primary();
      table.integer('score');
    })
  ])

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
  return knex.schema.dropTableIfExists('comments');
  return knex.schema.dropTableIfExists('ranking');
};
