'use strict';

const express = require('express');
const app = express();
const basicAuth = require('basic-auth');

app.use((req, res, next) => {
  const creds = basicAuth(req);

  if (creds && creds.name === 'admin' && creds.pass === 'meowmix') {
    return next();
  }

  res.set('WWW-Authenticate', 'Basic realm="Required"');
  res.sendStatus(401);
});

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('short'));

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const pets = require('./routes/pets');

app.use(pets);

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening on port', port);
});
