// require("babel-register")({
//     'presets': ["es2015", 'react', 'stage-3'],
// });
    
// require('babel-polyfill');
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
app.use('/react_ssr',express.static(path.join(__dirname, '../assets')));//静态资源
// app.use(express.static(config.root + '../assets'));

app.use(webpackMiddleware(compiler, { 
	noInfo: false,
	publicPath: config.output.publicPath,
	hot: true,
  info:false,
  progress:true,
	stats: {
		colors: true,
		chunks: false
	}
}));
app.use(logger('dev'));
app.use(webpackHotMiddleware(compiler));
require('../server/server')(app);
require('../assets/server')(app);
require('../server/error')(app);
require('../bin/www')(app);
