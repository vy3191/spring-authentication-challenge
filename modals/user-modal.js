const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');

function find() {
  const users = db('users').select();
  return users;
}

function findById(id) {
  const user = db('users').where("id", id).first();
  return user;
}

function findBy(filter) {
  console.log('line15',filter);
  const exists = db('users').where("username", filter).first();  
  return exists;
};

async function add(user) {
  user.password = await bcrypt.hash(user.password,16);
  const [id] = await db('users').insert(user);
  return await db('users').where('id', id).first();
}


module.exports = { find, findById, findBy, add };
