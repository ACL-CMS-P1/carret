const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//TODO: error handler

app.use(morgan('dev'));
app.use(bodyParser.json());

const sqreen = require('./routes/sqreen');
app.use('/sqreen', sqreen);

module.exports = app;
