var Router = require('express').Router();
var MovieController = require('./controller');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });

module.exports = function (passport) {

  Router.get(
    '/movie/:movieId?',
    csrfProtection,
    // passport.authenticate('jwt', { session: false }),
    MovieController.getAllMovies
  );

  Router.post(
    '/movie/add',
    passport.authenticate('jwt', { session: false }),
    MovieController.addMovie
  );

  Router.patch(
    '/movie/:movieId',
    passport.authenticate('jwt', { session: false }),
    MovieController.editMovie
  );

  Router.delete(
    '/movie/:movieId',
    passport.authenticate('jwt', { session: false }),
    MovieController.deleteMovieById
  );

  return Router;
};