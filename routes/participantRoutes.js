const router = require('express').Router()
const { User, Bet, Witness, Participant } = require('../models')
const passport = require('passport')
const sequelize = require('../db')

// all participant
// router.get('/participant', passport.authenticate('jwt'), (req, res) => {
//   participant.findAll({})
//     .then(participant => res.json(participant))
//     .catch(err => console.log(err))
// })

// all user participant
router.get('/participants/user', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.participants)
})

// get participant by id
router.get('/participants/:id', passport.authenticate('jwt'), (req, res) => {
  Participant.findOne({
    where: { id: req.params.id },
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// create a participant
router.post('/participants', passport.authenticate('jwt'), (req, res) => {
  Participant.create({
    alignCreator: req.body.alignCreator,
    betamount: req.body.betamount,
    user_id: req.user.id,
    bet_id: req.body.bet_id
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// update a participant
// not sure if this is needed
router.put('/participant/:id', passport.authenticate('jwt'), (req, res) => {
  Participant.update(
    req.body,
    { where: { id: req.params.id } }
  )
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// delete a participant
router.delete('/participant/:id', passport.authenticate('jwt'), (req, res) => {
  Participant.destroy({
    where: { id: req.params.id }
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

module.exports = router