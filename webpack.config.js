const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',

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
      }
    ]
  },

  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }
};
