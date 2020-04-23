const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  // console.log(db('users').where('id', filter))
  return db('users').where('username', filter);
}

function add(user) {
  return db('users').insert(user)
        .then(([id]) => {
    findById(id);
  });

  // return 
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
