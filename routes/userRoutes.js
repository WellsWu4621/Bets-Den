const router = require('express').Router()
const { User, Bets, Witness, Participant } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
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

router.get('/users/:id/bets/creator', (req, res) => {
  Bets.findAll({
    where: { creator_id: req.params.id }
  })
    .then(bets => res.json(bets))
    .catch(err => console.log(err))
})
module.exports = router
