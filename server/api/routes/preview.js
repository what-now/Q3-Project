const router = require('express').Router()
const scraper = require('metascraper')

router.post('/', (req, res, next) => {
  const url = req.body.url

  console.log(url);

  scraper.scrapeUrl(url).then(data => res.send(data)).catch(error => next(error))
})

module.exports = router;
