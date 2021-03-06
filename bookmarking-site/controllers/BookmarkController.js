var Promise = require('bluebird')
var superagent = require('superagent')

var Bookmark = require('../models/Bookmark')
var Scraper = require('../utils/Scraper')

module.exports = {

  find: function(params, isRaw) {
    return new Promise(function(resolve, reject) {
      Bookmark.find(params, function(err, bookmarks) {
        if (err) {
          reject(err)
          return
        }

        if(isRaw) {
          resolve(bookmarks)
          return
        }

        var summaries = []
        bookmarks.forEach(function(bookmark) {
          summaries.push(bookmark.summary())
        })
        resolve(summaries)
      })
    })
  },


  findById: function(id) {
    return new Promise(function(resolve, reject) {
      Bookmark.findById(id, function(err, bookmark) {
        if (err) {
          reject(err)
          return
        }
        resolve(bookmark.summary())
      })
    })
  },


  create: function(params) {
    return new Promise(function(resolve, reject) {

      superagent
        .get(params.url)
        .query(null)
        .set('Accept', 'text/html')
        .end(function(err, response) {
          if (err) {
            reject(err)
            return
          }

          var html = response.text
          var props = ['og:title', 'og:description', 'og:image', 'og:url']
          var metaData = Scraper.scrape(html, props)

          var keys = Object.keys(metaData)
          keys.forEach(function(key, i) {
            params[key] = metaData[key]
          })

          Bookmark.create(params, function(err, bookmark) {
            if (err) {
              reject(err)
              return
            }
            resolve(bookmark.summary())
          })
        })
    })
  },

}
