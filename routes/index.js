const router = require('express').Router()

router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./betsRoutes.js'))
router.use('/api', require('./participantRoutes.js'))
router.use('/api', require('./witnessRoutes.js'))

// other routers go here...

module.exports = router
