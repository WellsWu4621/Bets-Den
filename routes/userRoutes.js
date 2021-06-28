const router = require('express').Router()
const { User, Bet, Witness, Participant } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const sequelize = require('sequelize')

router.post('/users/register', (req, res) => {
  const {username, email, DiscordName,password} = req.body
  User.register(new User({username,  email, DiscordName, password}), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

router.get('/users/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

router.get('/user', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.id)
})
router.get('/user/profile', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

// update for user's tokens
router.put('/users/tokens', passport.authenticate('jwt'), (req, res) => {
  User.update({
    Tokens: req.body.tokens
  }, { where: { id: req.user.id } }
  )
    .then(tokens => res.json(tokens))
    .catch(err => console.log(err))
})

// update for tokens via id
router.put('/users/:id', passport.authenticate('jwt'), (req, res) => {
  User.update(
    req.body,
    { where: { id: req.params.id } }
  )
    .then(tokens => res.json(tokens))
    .catch(err => console.log(err))
})
module.exports = router
