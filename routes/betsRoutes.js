const router = require('express').Router()
const { User, Bets, Witness, Participant } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const sequelize = require('../db')

// all bets
router.get('/bets', passport.authenticate('jwt'), (req, res) => {
  Bets.findAll()
    .then(bets => res.json(bets))
    .catch(err => console.log(err))
})

// all user bets
router.get('/bets', passport.authenticate('jwt'), (req, res) => {
  Bets.findAll(req.user.bets)
    .then(bets => res.json(bets))
    .catch(err => console.log(err))
})

// get bet by id
// add passport.authenticate('jwt')
router.get('/bets/:id', passport.authenticate('jwt'), (req, res) => {
  Bets.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Participant,
      },
      {
        model: Witness,
      }
    ]
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// create a bet
// add passport.authenticate('jwt')
router.post('/bets', passport.authenticate('jwt'), (req, res) => {
  Bets.create({
    name: req.body.name,
    description: req.body.description,
    value: req.body.value,
    // change body.creator_id to user.id when login is possible
    creator_id: req.user.id,
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// update a bet
router.put('/bets/:id', passport.authenticate('jwt'), (req, res) => {
  Bets.update(
    req.body,
    { where: { id: req.params.id } }
  )
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// update a bets amount
// Probhably wrong!!!
router.put('/bets/:id/amount', passport.authenticate('jwt'), (req, res) => {
  Bets.update({
    value: req.body.value
  },
    { where: { id: req.params.id } }
  )
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// delete a bet/close bet
router.delete('/bets/:id', passport.authenticate('jwt'), (req, res) => {
  Bets.destroy({
    where: { id: req.params.id }
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

module.exports = router