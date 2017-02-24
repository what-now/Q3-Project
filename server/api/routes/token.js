const router = require('express').Router();

router.post('/', (req, res) => {
  res.send('yay')
})

module.exports = router;
