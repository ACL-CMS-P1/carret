const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
// const ensureAuth = require('./auth/ensure-auth')();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const sqreen = require('./routes/sqreen');
app.use('/sqreen', sqreen);

const auth = require('./routes/auth');
// const me = require('./routes/me');

app.use('/auth', auth);
// app.use('/me', me);

app.use(errorHandler());

module.exports = app;
