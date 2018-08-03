var fs = require('fs')
var path = require('path');
var webpack = require('webpack');
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  devtool: false,
  entry: {
    index: ['./server/routes.js']
  },
  output: {
    path: path.resolve(__dirname, '../assets/server'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:4].js',
    publicPath: '/server/',
    libraryTarget: "commonjs2"
  },
  //keep node_module paths out of the bundle 将node_module路径保留在捆绑中 ,即不打包到代码内去
  externals: fs.readdirSync(path.resolve(__dirname, '../node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    /*new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),*/
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      },
      __DEBUG__: false,
      __CLIENT__: false
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss','.json','.css'],
    alias: {
      src :path.resolve(__dirname, '../src'),
    },
    // modules: ['node_modules'],
  },
  module: {
    rules: [
      { 
        test: /\.(js|jsx)$/, 
        use: [
          {
            loader: 'babel-loader'
          },
        ],
        exclude: /node_modules/
      },
      { 
        test: /\.scss$/, 
        use: [
          {
            loader: 'ignore-loader',
            // loader: 'style!css!autoprefixer?{browsers:["> 1%", "IE 8"]}!sass'
          },
        ],
      },
      { 
        test: /\.css$/, 
        use: [
          {
            loader: 'ignore-loader',
            // loader: 'style!css!autoprefixer?{browsers:["> 1%", "IE 8"]}!sass'
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=12&name=images/[name].[hash:8].[ext]',
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
          },
        ],
      },
    ]
  }
};
