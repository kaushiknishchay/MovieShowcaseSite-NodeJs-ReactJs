const Movie = require('../../models/Movie');

const getAllMovies = function (req, res, next) {
  const {
    movieId,
  } = req.query;

  if (movieId) {
    Movie
      .findById(movieId)
      .exec()
      .then(movie => res.json(movie))
      .catch(err => next(err));
  } else {
    Movie
      .find()
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
    cast,
    duration,
    releaseDate,
    userRating,
    languages,
    genre
  });

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