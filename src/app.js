const express = require('express');
const morgan = require('morgan');
const { createRoles } = require('./libs/initialSetUp');
const app = express();
createRoles();
const routerUsers = require('./routes/index');

require('./db');

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

app.use('/', routerUsers);

module.exports = app;