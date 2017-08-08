const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const auth = require('./routes/auth');
const me = require('./routes/me');

app.use('/auth', auth);
app.use('/users/me', ensureAuth, me);

app.use(errorHandler());

module.exports = app;