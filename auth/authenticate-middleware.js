/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')

const { jwtSecret } = require('../config/secrets.js')


module.exports = (req, res, next) => {
  const token = req.headers.authorization
  // will fail if the secret is changed
  console.log('request headers', req.headers)
  if(token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if(err) {
        // the token is not valid
        res.status(401).json({message: 'you are a teapot. this can\'t be used'})
      } else {
        next()
      }
    })

  } else {
    res.status(401).json({message: 'you shall not pass!'})
  }
};
