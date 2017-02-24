const router = require('express').Router();

router.use('/user', require('./routes/user'))
router.use('/token', require('./routes/token'))

module.exports = router
