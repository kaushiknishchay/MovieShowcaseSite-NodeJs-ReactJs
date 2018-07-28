const flatMap = require('lodash/map');
const partialRight = require('lodash/partialRight');
const pick = require('lodash/pick');
const Actor = require('../../models/Actor');
const Movie = require('../../models/Movie');

const getAllMovies = function (req, res, next) {
  const {
    movieId,
  } = req.param;

  if (movieId) {
    Movie
      .findById(movieId)
      .populate('cast', ['name', 'roleName'])
      .exec()
      .then(movie => res.json(movie))
      .catch(err => next(err));
  } else {
    Movie
      .find()
      .populate('cast', ['name', 'roleName'])
      .exec()
      .then(movie => res.json(movie))
      .catch(err => next(err));
  }
};


const addMovie = function (req, res, next) {
  const {
    name,
    synopsis,
    poster,
    trailer,
    censorRating,
    cast,
    duration,
    releaseDate,
    userRating,
    languages,
    genre
  } = req.body;

  const movie = new Movie({
    name,
    synopsis,
    poster,
    trailer,
    censorRating,
    // cast,
    duration,
    releaseDate,
    userRating,
    languages,
    genre
  });

  Actor
    .insertMany(cast)
    .then(casts => {
      const movieActors = flatMap(casts,
        (actor) => {
          return pick(actor, '_id')._id;
        });
      movie.cast = movieActors;
      movie
        .save()
        .then(movie => res.json({
          ...{
            id: movie._id,
            name: movie.name
          },
          ...{ success: true }
        }))
        .catch(err => next(err));
    })
    .catch(err => next(err));

  /*
    */
};

const editMovie = function (req, res, next) {
  const {
    movieId,
  } = req.params;

  Movie
    .findByIdAndUpdate(
      movieId,
      req.body,
      {
        new: true
      }
    )
    .exec()
    .then(movie => res.json({
      ...{
        name: movie.name
      },
      ...{ success: true }
    }))
    .catch(err => next(err));

};

const deleteMovieById = function (req, res, next) {
  const {
    movieId
  } = req.params;

  Movie
    .findByIdAndRemove(movieId)
    .exec()
    .then(() => res.json({ success: true }))
    .catch(e => next(e));
};

module.exports = {
  getAllMovies,
  addMovie,
  editMovie,
  deleteMovieById
};