var cookieParser = require('cookie-parser')
var compression = require('compression')
var config = require('./config')
var path = require('path');
module.exports = function (app) {
  app.set('view engine', 'html');
  app.set('views', config.root + '/views')
  app.engine('.html', require('ejs').__express)
  app.use(compression())
  app.use(cookieParser())
}