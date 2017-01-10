const webpack = require('webpack');
const path = require('path');
const alias = require('../alias');

module.exports = {
  entry: {
    devtools: './src/devtools.js',
    background: './src/background.js',
    'devtools-background': './src/devtools-background.js',
    'detector': './src/detector.js'
  },
  output: {
    filename: '[name].js',

    libraryTarget: 'umd',
    pathinfo: true,
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/'
  },
  externals: {
    'jquery': 'jQuery'
  },
  resolve: {
    alias
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          'presets': ['es2015', 'stage-3'],
          'comments': false
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        loader: 'less-loader'
      },

      { test: /\.css$/, loaders: ['style', 'css'] },
      // => 'style' and 'css' loader is used for '.css' files
      {
        test: /\.(png|woff2)$/,
        loader: 'url-loader?limit=0'
      }
    ]
  },

  target: 'web',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],

  devtool: 'source-map'
};
