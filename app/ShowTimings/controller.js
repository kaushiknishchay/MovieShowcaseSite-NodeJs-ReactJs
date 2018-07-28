const ShowTimings = require('../../models/ShowTimings');

const getAllMovieTimings = function (req, res, next) {
  const {
    movieId,
  } = req.params;

  if (movieId) {
    ShowTimings
      .find({ movie: movieId })
      .exec()
      .then(allTimings => res.json(allTimings))
      .catch(err => next(err));
  } else {
    res.json({ success: false });
  }
};


const addShowTiming = function (req, res, next) {
  const {
    showDate,
    showTimesAndPrice,
    screenType,
    cinema,
    movie,
  } = req.body;

  const movieShow = new ShowTimings({
    showDate,
    showTimesAndPrice,
    screenType,
    cinema,
    movie,
  });

  movieShow
    .save()
    .then(show => res.json({
      ...{
        id: show._id,
      },
      ...{ success: true }
    }))
    .catch(err => next(err));
};

const editShowTiming = function (req, res, next) {
  const {
    showTimeId,
  } = req.params;

  ShowTimings
    .findByIdAndUpdate(
      showTimeId,
      req.body,
      {
        new: true
      }
    )
    .exec()
    .then(show => res.json({
      ...{
        id: show._id
      },
      ...{ success: true }
    }))
    .catch(err => next(err));

};

const deleteShowTimingById = function (req, res, next) {
  const {
    showTimeId
  } = req.params;

  ShowTimings
    .findByIdAndRemove(showTimeId)
    .exec()
    .then(() => res.json({ success: true }))
    .catch(e => next(e));
};

module.exports = {
  getAllMovieTimings,
  addShowTiming,
  editShowTiming,
  deleteShowTimingById
};