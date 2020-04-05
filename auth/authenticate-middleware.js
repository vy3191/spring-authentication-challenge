/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) res.status(401).json({ you: 'shall not pass!' });

  const JWT_SECRET = "STAY HOME, SAVE LIVES";

  jwt.verify(token, JWT_SECRET, (err,decode) => {
     if(err) res.status(401).json({ you: 'shall not pass!' });
     req.token = decode;
     next()
  })

};
