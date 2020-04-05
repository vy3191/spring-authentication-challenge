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

router.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body;    
    if(!username) res.status(400).json({msg:'User name is missing'});
    if(!password) res.status(400).json({msg:'Password is missing'});
    if(!req.body) res.status(400).json({msg:'Something is missing'});
    const existingUser = await userModal.findBy(username);
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    console.log('line 31', existingUser);
    console.log('line 32', matchPassword);
    // if(!existingUser || !matchPassword) res.status(401).json({msg:'Invalid credentials'});
    //Implementing json web token
    const payload = { userId: existingUser.id}
    const secret = "STAY HOME, SAVE LIVES";
    const token = jwt.sign(payload, secret);
    res.setHeader('Set-Cookie', `token=${token}; path=/; httpOnly=true`);    
    res.status(200).json({msg:`Welcome back ${username}`});
  }catch(err) {
    next(err);
  }


});

module.exports = router;
