const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets.js')
const Users = require('../users/users-model.js');

router.get('/', (req, res) => {
  console.log('here')
  res.status(200)
})
router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
    console.log(user)

  const hash = bcrypt.hashSync(user.password, 5); // 2 ^ n
  user.password = hash;
  // const token = signToken(user)

  // console.log(user)
  // send a token in the register
  Users.add(user)
    .then(saved => {
      console.log('user saved', user)
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;
  console.log(username, password)
  // Users.findBy(username)
  // .first()
  //   .then(stuff => {
  //     console.log(stuff)
  //     console.log(bcrypt.compareSync(password, stuff.password))
  //     if(bcrypt.compareSync(password, stuff.password)) {
  //       console.log('passes')
  //     }
  //   })
  Users.findBy(username)
    .then(stuff => {
      console.log('username', stuff)
    })
    Users.find()
    .then(stuff => {
      console.log('all', stuff)
    })
  Users.findBy( username ) // failing
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = signToken(user)
        // console.log('user passes')
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
