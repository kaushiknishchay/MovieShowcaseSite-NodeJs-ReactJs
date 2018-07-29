require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

/**
 * Get enviornment specific config
 */
const config = require('./config');

const port = process.env.PORT || 3000;

const app = express();

/**
 * Connect to DB
 */
mongoose.connect(config.db, { useNewUrlParser: true });

const connection = mongoose.connection;

module.exports = {
  app,
  connection
};


/**
 * Setup Passport Local Strategy
 */
require('./config/passport/local');

require('./config/express')(app, passport);
require('./config/routes')(app, passport);

connection
  .on('error', console.error.bind(console, 'connection error:'))
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}
