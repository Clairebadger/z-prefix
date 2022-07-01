/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bloguser').del()
  await knex('bloguser').insert([
    {firstname: 'claire', lastname: 'badger', username:'bigbadbadger', password : '$2b$10$9KVxzAZWzWbrGC0ngmqQk.zTgBU7uAUlY.N92xoF2D0xdsjSsdkwe'},
    {firstname: 'ahbed', lastname: 'nadir', username:'coolcoolcool', password : '$2b$10$pBSiigr2Two9GMQEJC5lR.GgyDfvQ15MPF3vXL3zC0YTwK2/iNHly'},
    {firstname: 'ed', lastname: 'elric', username:'fullmetal', password : '$2b$10$NTb.niQq8ILcCsQSqQJn1.nNfo.bLj5Q7R8kqcqDFgf0gYkvJO37K'}
  ]);
};
