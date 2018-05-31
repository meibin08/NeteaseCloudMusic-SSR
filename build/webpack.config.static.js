
/*
 * @authors :Bin Mei
 * @date    :2018-05-29
 * @description：github静态服务器打包
 */

var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.prd');
var PreloadWebpackPlugin = require('preload-webpack-plugin');
var HtmlWebPackPlugin = require('html-webpack-plugin')


config.output.publicPath = "/NeteaseCloudMusic-SSR/";
config.plugins.push(new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  },
  __DEBUG__: false,
  __CLIENT__: true,
  __STATIC__:true 
}));


config.plugins.push(new PreloadWebpackPlugin({
  rel: 'prefetch',
  // as: 'script'
  fileBlacklist: [/\index.css|index.js|vendors.js/, /\.whatever/]
}))
config.plugins.push(new HtmlWebPackPlugin({
  filename: path.resolve(__dirname, '../assets/index.html'), //输出
  minify:{ //压缩HTML文件　
　　removeComments:true, //移除HTML中的注释 
　　collapseWhitespace:true //删除空白符与换行符
},
  template: path.resolve(__dirname,"../src/views/temp.html"),//输入
  // inlineSource:  '.(js|css)',// 插入到html的css、js文件都要内联
  // inject: false //是否能注入内容到 输出 的页面去
}));
// config.plugins.push(new HtmlWebpackInlineSourcePlugin());// 实例化内联资源插件
 //复制文件
// config.plugins.push(new CopyWebpackPlugin([
//    {
//      from : path.resolve(__dirname, '../src/json'),//定义要拷贝的源目录   __dirname + ‘/src/public’
//      to : path.resolve(__dirname, '../assets/json'),//定义要拷贝的目标目录  __dirname + ‘/dist’
//     //  toType : 'dir'//file 或者 dir , 可选，默认是文件
//     //  force : 强制覆盖先前的插件 , 可选 默认false
//     //  context : 不知道作用 , 可选 默认 base context 可用 specific context
//     //  flatten :只拷贝文件不管文件夹 , 默认是false
//     //  ignore : 忽略拷贝指定的文件 ,可以用模糊匹配
//   }
// ]));

module.exports = config;
