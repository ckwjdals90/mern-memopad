import express from 'express';
import path from 'path';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const devPort = 4000;

const app = express();
const PORT = 3000;

app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
  return res.send('Hello React');
});

app.listen(PORT, () => {
  console.log('express server is listening on PORT: ' + PORT);
});

if(process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');
  const config = require('../webpack.dev.config');
  const compiler = webpack(config);
  const devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(
    devPort, () => {
      console.log('dev-server is listening on PORT: ', devPort);
    }
  );
}
