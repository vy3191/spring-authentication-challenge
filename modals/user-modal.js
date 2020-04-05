const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

function find() {
  const users = db('users').select();
  return users;
}

function findById(id) {
  const user = db('users').where("id", id).first();
  return user;


function findBy(filter) {
  const user =  db('users').where(filter).first();
  return user
};

async function add(user) {
  const user.password = bcrypt.hash(user.password, 16);
  const [id] = await db('users').insert(user);
  return await db('users').where("id", id).first();
};

module.exports = {
  find, findById, findBy, add
}