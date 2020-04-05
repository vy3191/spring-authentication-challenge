const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authDB = require('../database/dbConfig');

router.post('/register', (req, res) => {
  // implement registration
  const {username, password} = req.body;
  if(!username) req.status(400).json({msg:'User name is missing'});
  if(!password) req.status(400).json({msg:'Password is missing'});
  if(!req.body) req.status(400).json({msg:'Something is missing'});
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
