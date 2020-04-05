const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModal = require('../modals/user-modal');

router.post('/register', async (req, res,next) => {  
  try {
    const {username, password} = req.body;    
    if(!username) res.status(400).json({msg:'User name is missing'});
    if(!password) res.status(400).json({msg:'Password is missing'});
    if(!req.body) res.status(400).json({msg:'Something is missing'});
    const existingUser = await userModal.findBy(username);
    console.log(existingUser)
    if(existingUser) res.status(409).json({msg:`User with username ${username} already exists`});
    const newUser = await userModal.add(req.body);
    res.status(201).json(newUser);
  }catch(err) {
    next(err);
  }

});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
