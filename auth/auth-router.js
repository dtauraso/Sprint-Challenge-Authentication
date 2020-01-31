const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets.js')
const Users = require('../users/users-model.js');


router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;
  // send a token in the register
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = signToken(user)

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error);
    });
});

// hoisted to top of scope
function signToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  }
  // const secret = 'is it secret, is it safe?'

  const options = {
    expiresIn: '1d'

  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
