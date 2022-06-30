/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bloguser').del()
  await knex('bloguser').insert([
    {firstname: 'claire', lastname: 'badger', username:'bigbadbadger', password : '$2b$10$9KVxzAZWzWbrGC0ngmqQk.zTgBU7uAUlY.N92xoF2D0xdsjSsdkwe'}
  ]);
};
