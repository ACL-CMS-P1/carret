const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');
const ensureAuth = require('./auth/ensure-auth')();
const ruleLoader = require('./utils/rule-loader');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

ruleLoader.saveRulesInDB();

const auth = require('./routes/auth');
const me = require('./routes/me');

app.use('/auth', auth);
app.use('/me', ensureAuth, me);

app.use(errorHandler());

module.exports = app;
