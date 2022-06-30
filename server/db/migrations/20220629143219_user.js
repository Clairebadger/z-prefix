/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bloguser', (table) => {
        table.increments();
        table.string('firstname', 30);
        table.string('lastname', 30);
        table.string('username', 30);
        table.string('password', 250)
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('bloguser')
};
