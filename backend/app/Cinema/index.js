var Router = require('express').Router();
var CinemaController = require('./controller');

module.exports = function (passport) {

  Router.get(
    '/cinema/:cinemaId?',
    // passport.authenticate('jwt', { session: false }),
    CinemaController.getAllCinemas
  );

  Router.post(
    '/cinema/add',
    passport.authenticate('jwt', { session: false }),
    CinemaController.addCinema
  );

  Router.patch(
    '/cinema/:cinemaId',
    passport.authenticate('jwt', { session: false }),
    CinemaController.editCinema
  );

  Router.delete(
    '/cinema/:cinemaId',
    passport.authenticate('jwt', { session: false }),
    CinemaController.deleteCinemaById
  );

  return Router;
};