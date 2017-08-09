const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();
const ensureAdmin = require('./auth/ensure-role')('admin');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

const auth = require('./routes/auth');
const me = require('./routes/me');
const admin = require('./routes/admin');

app.use('/auth', auth);
app.use('/me', ensureAuth, me);
app.use('/admin', ensureAuth, ensureAdmin, admin);

app.use(errorHandler());

module.exports = app;
