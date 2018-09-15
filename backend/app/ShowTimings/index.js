var Router = require('express').Router();
var ShowTimingsController = require('./controller');

module.exports = function (passport) {

  Router.get(
    '/showtimings/:movieId/:cinemaId?',
    ShowTimingsController.getAllMovieTimings
  );

  Router.post(
    '/showtimings/add',
    passport.authenticate('jwt', { session: false }),
    ShowTimingsController.addShowTiming
  );

  Router.patch(
    '/showtimings/:showTimeId',
    passport.authenticate('jwt', { session: false }),
    ShowTimingsController.editShowTiming
  );

  Router.delete(
    '/showtimings/:showTimeId',
    passport.authenticate('jwt', { session: false }),
    ShowTimingsController.deleteShowTimingById
  );

  return Router;
};