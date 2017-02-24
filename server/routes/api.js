const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('Weeeeeeeee')
})

module.exports = router
