var Router = require('express').Router();
var UserController = require('./controller');

module.exports = function (passport) {

  Router.post('/auth/signup', UserController.register);

  Router.get('/auth/users', UserController.getUsers);

  // Router.delete('/:userId', passport.authenticate('jwt', { session: false }), UserController.deleteUserById);

  Router.post('/auth/login', UserController.login(passport));

  return Router;
};