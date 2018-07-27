
var express = require('express');
var logger = require('morgan');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config.dev');
var path = require('path');
var app = express();
var compiler = webpack(config);

require('../server/express')(app);
app.use(webpackMiddleware(compiler, { 
	noInfo: false,
	publicPath: config.output.publicPath,
	hot: true,
  info:false,
  progress:false,
  quiet: false,
	stats: {
		colors: true,
		chunks: false
	}
}));
app.use(logger('dev'));
app.use(webpackHotMiddleware(compiler));
require('../server/server')(app);
require('../server/ejs')(app);
app.get(/^(?!\/client)\/*/i, function (req, res, next) {
  console.log("dev----:"+req.url)
  res.render('dev');
});
require('../server/error')(app);
require('../bin/www')(app);
