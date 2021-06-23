require('dotenv').config()

const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { User, Bet, Witness, Participant } = require('./models')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

// handlebars stuff
const exphbs = require('express-handlebars')
const hbs = exphbs.create({})

const app = express()

// more handlebars
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({ id })
    .then(user => done(null, user))
    .catch(err => done(err, null))
})

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, ({ id }, cb) => User.findOne({ where: { id }, include: [Bet] })
  .then(user => cb(null, user))
  .catch(err => cb(err))))

app.use(require('./routes'))

require('./db').sync()
  .then(() => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err))
