const router = require('express').Router()
const { User, Bet, Witness, Participant } = require('../models')
const passport = require('passport')
const sequelize = require('../db')

// all witness
// router.get('/witness', passport.authenticate('jwt'), (req, res) => {
//   Witness.findAll({})
//     .then(Witness => res.json(Witness))
//     .catch(err => console.log(err))
// })

// all user witness
router.get('/witness/user', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.witnesses)
})

// get witnes by id
router.get('/witness/:id', passport.authenticate('jwt'), (req, res) => {
  Witness.findOne({
    where: { id: req.params.id },
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// create a witness
router.post('/witness', passport.authenticate('jwt'), (req, res) => {
  Witness.create({
    user_id: req.user.id,
    bet_id: req.body.bet_id,
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// update a witness
// not sure if this is needed
router.put('/witness/:id', passport.authenticate('jwt'), (req, res) => {
  Witness.update(
    req.body,
    { where: { id: req.params.id } }
  )
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

// delete a witness
router.delete('/witness/:id', passport.authenticate('jwt'), (req, res) => {
  Witness.destroy({
    where: { id: req.params.id }
  })
    .then(bet => res.json(bet))
    .catch(err => console.log(err))
})

module.exports = router