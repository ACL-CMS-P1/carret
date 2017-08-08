const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));
app.use(bodyParser.json());

const sqreen = require('./routes/sqreen');
app.use('/sqreen', sqreen);

const auth = require('./routes/auth');
const me = require('./routes/me');

app.use('/auth', auth);
app.use('/me', ensureAuth, me);

app.use(errorHandler());

module.exports = app;
