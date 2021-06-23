const router = require('express').Router()
const { User, Bets, Witness, Participant } = require('../models')
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

router.get('/users/:id', (req, res) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => res.json(user))
    .catch(err => console.log(err))
})
module.exports = router
