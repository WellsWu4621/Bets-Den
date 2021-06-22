const router = require('express').Router()
const { User, Bets, Witness, Participant } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { json } = require('sequelize/types')

