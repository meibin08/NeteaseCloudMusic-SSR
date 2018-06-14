
var httpProxy = require('http-proxy');
var config = require('./config');
var logger = require('./logger');

module.exports = function (app) {

  var insuranceServers = config.INSURANCE_SERVER;
  var apiServers = config.API;

  var proxy = httpProxy.createProxyServer();
  
  proxy.on('error', function(e) {
    logger.error(e);
  });
  
  //设置服务端之间的请求头
  proxy.on('proxyReq', function(proxyReq, req, res, options) {

    proxyReq.setHeader('Referer', 'http://music.163.com');
    proxyReq.setHeader('Host', 'music.163.com');
  });


  // 服务器部署验证
  app.get('/health', function (req, res) {
    return res.status(200).send('OK');
  });
  

  app.all('/musicApi/*', function (req, res) {//接口API代理
    var url = req.url;
    console.log('req:', url)
    var regExp = /\/musicApi\/(.*?)\//,
      hostkey = req.url.match(regExp)[1],
      target = '';
    req.url = req.url.replace(regExp, '/');
    target = 'http://' + apiServers[hostkey].host;
    console.log('--代理---musicApi:', target + req.url);
    console.log('-------------------------');
    proxy.web(req, res, {
      target: target,
      changeOrigin: true
    });
  });
  app.get('/',(req, res)=>res.redirect("/music")); //默认 / 开关重定向到 music页 dev|prd共用设置

  // app.get('/redux/*', function (req, res, next) {
  //   res.render('index');
  // });

  // app.get('*', function (req, res, next) {
  //   res.render('index');
  // });

};
