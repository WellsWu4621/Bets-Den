const router = require('express').Router()
const { User, Bet, Witness, Participant } = require('../models')
const passport = require('passport')
const sequelize = require('../db')

// all bets
router.get('/bets', passport.authenticate('jwt'), (req, res) => {
  Bet.findAll()
    .then(bets => res.json(bets))
    .catch(err => console.log(err))
})

// all user bets
router.get('/bets/user', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.bets)
})

// get bet by id
// add passport.authenticate('jwt')
router.get('/bets/:id', passport.authenticate('jwt'), (req, res) => {
  Bet.findOne({
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
  Bet.create({
    name: req.body.name,
    description: req.body.description,
    creator_value: req.body.creator_value,
    for_value: req.body.for_value,
    against_value: req.body.against_value,
    // change body.creator_id to user.id when login is possible
    creator_id: req.user.id,
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// update a bet
router.put('/bets/:id', passport.authenticate('jwt'), (req, res) => {
  Bet.update(
    req.body,
    { where: { id: req.params.id } }
  )
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// update a bets amount
// Probhably wrong!!!
router.put('/bets/:id/foramount', passport.authenticate('jwt'), (req, res) => {
  Bet.update({
    for_value: req.body.value
  },
    { where: { id: req.params.id } }
  )
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})
router.put('/bets/:id/againstamount', passport.authenticate('jwt'), (req, res) => {
  Bet.update({
    against_value: req.body.value
  },
    { where: { id: req.params.id } }
  )
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// delete a bet/close bet
router.delete('/bets/:id', passport.authenticate('jwt'), (req, res) => {
  Bet.destroy({
    where: { id: req.params.id }
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

module.exports = router