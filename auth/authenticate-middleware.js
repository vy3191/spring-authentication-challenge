/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // const token = req.cookies.token;
  const { token } = req.cookies;
  // console.log('token>>>>>>>>>>>', token)
  if(!token) res.status(401).json({ you: 'shall not pass!' });

  

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err,decode) => {
     if(err) res.status(401).json({ you: 'shall not pass!' });
     req.token = decode;
     next();
  });

};
