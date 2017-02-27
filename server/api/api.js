const router = require('express').Router();
const boom = require('boom');

router.use('/user', require('./routes/user'))
router.use('/token', require('./routes/token'))

router.use((req, res, next) => {
  next(boom.notFound())
});

module.exports = router
