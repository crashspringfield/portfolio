var express = require('express')
var router = express.Router()
var cheerio = require('cheerio')
var superagent = require('superagent')

var Scraper = require('../utils/Scraper')

router.get('/', function(req, res, next) {
  var url = req.query.url
  if (url == null) {
    res.json({
      confirmation: 'fail',
      message: 'Please enter a vaild URL'
    })
    return
  }

  superagent
    .get(url)
    .query(null)
    .set('Accept', 'text/html')
    .end(function(err, response) {
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }

      var html = response.text
      var props = ['og:title', 'og:description', 'og:image', 'og:url']
      var metaData = Scraper.scrape(html, props)

      res.json({
        confirmation: 'success',
        tags: metaData
      })
    })

})

module.exports = router
