const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/index.js',
    './src/style.css'
  ],

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?' + JSON.stringify({
          cacheDirectory: true,
          presets: ['es2015', 'react']
        })],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }
};
