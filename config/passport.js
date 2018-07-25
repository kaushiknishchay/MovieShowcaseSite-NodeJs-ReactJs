'use strict';

const mongoose = require('mongoose');
const local = require('./passport/local');

const User = mongoose.model('User');

module.exports = function (passport) {

  // serialize and deserialize sessions
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findOne({ _id: id }, done));

  // use these strategies
  passport.use(local);
};
