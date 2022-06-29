/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bloguser', (table) => {
        table.increments();
        table.string('firstname', 20);
        table.string('lastname', 20);
        table.string('username', 30);
        table.string('password', 100)
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bloguser')
};
