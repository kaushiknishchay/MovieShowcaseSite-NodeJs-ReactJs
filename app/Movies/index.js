var Router = require('express').Router();
var MovieController = require('./controller');

module.exports = function (passport) {

  Router.get(
    '/movie',
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