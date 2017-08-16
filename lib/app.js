const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();
const ensureAdmin = require('./auth/ensure-role')('admin');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

const auth = require('./routes/auth');
const me = require('./routes/me');
const users = require('./routes/users');
const adminReports = require('./routes/admin-reports');

app.use('/auth', auth);
app.use('/me', ensureAuth, me);
app.use('/users', ensureAuth, ensureAdmin, users);
app.use('/admin/reports', ensureAuth, ensureAdmin, adminReports);

app.use(errorHandler());

module.exports = app;
