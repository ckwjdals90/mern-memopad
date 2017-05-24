const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://0.0.0.0:4000',
    'webpack/hot/only-dev-server',
    './src/style.css'
  ],

  output: {
    path: '/',
    filename: 'bundle.js'
  },

  devServer: {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './public',
    proxy: {
      "**": "http://localhost:3000"
    },
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timing: false,
      chunks: false,
      chunkModules: false
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
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
