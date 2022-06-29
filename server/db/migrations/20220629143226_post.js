/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('post', (table) => {
        table.increments();
        table.integer('userid');
        table.foreign('userid').references('bloguser.id');
        table.string('title', 20);
        table.string('content', 250);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('post', table => {
        table.dropForeign('userid')
      })
      .then(() => {
        return knex.schema.dropTableIfExists('post');
      })
};
