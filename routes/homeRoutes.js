const router = require('express').Router()
const { User, Bet, Witness, Participant } = require('../models')
const passport = require('passport')
const sequelize = require('../db')

// login
router.get('/login', (req, res, next) => {
  res.render('login', { css: ['style.css'], js: ['login.js']})
})

// register
router.get('/register', (req, res, next) => {
  res.render('register', {css: ['register.css']})
})

// // open post
// router.get('/blog/:id', (req, res, next) => {
//   res.render('blog', { blogid: req.params.id })
// })

// // edit post
// router.get('/update/:id', (req, res, next) => {
//   res.render('update', { editid: req.params.id })
// })

// dashboard
router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', {css: ['style.css']})
})

// new post
router.get('/newbets', (req, res, next) => {
  res.render('newbets', {css: ['style.css']})
})

// default get coins page
router.get('/coins', (req, res, next) => {
  res.render('coins', { css: ['coins.css'], js: ['coins.js']})
})

router.get('/profile', (req, res, next) => {
  res.render('profile', { css: ['profile.css'], js: ['profile.js']})
})

// default home
router.get('/*', (req, res, next) => {
  res.render('home', {css: ['.css']})
})


module.exports = router