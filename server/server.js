import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import morgan from 'morgan';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import session from 'express-session';

import api from './routes';

const app = express();
const PORT = 3000;
const devPort = 4000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* MongoDB Connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to MongoDB Server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/ris_memopad');

/* use session */
app.use(session({
  secret: 'ChaCha$04$21',
  resave: false,
  saveUninitialized: true
}));

app.use('/', express.static(path.join(__dirname, './../public')));

/* setup routers & static directory */
app.use('/api', api);

/* support client-side routing */
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../public/index.html'));
})

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.get('/hello', (req, res) => {
  return res.send('Hello React');
});

app.listen(PORT, () => {
  console.log('express server is listening on PORT: ' + PORT);
});

if (process.env.NODE_ENV == 'development') {
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
