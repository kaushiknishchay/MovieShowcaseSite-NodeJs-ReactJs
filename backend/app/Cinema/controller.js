const Cinema = require('../../models/Cinema');

const getAllCinemas = function (req, res, next) {
  const {
    cinemaId,
  } = req.params;

  if (cinemaId) {
    Cinema
      .findById(cinemaId)
      .exec()
      .then(cinema => res.json(cinema))
      .catch(err => next(err));
  } else {
    Cinema
      .find()
      .exec()
      .then(cinema => res.json(cinema))
      .catch(err => next(err));
  }
};


const addCinema = function (req, res, next) {
  const {
    name,
    address,
    screenTypes
  } = req.body;

  const cinema = new Cinema({
    name,
    address,
    screenTypes
  });

  cinema
    .save()
    .then(cinema => res.json({
      ...{
        id: cinema._id,
        name: cinema.name
      },
      ...{ success: true }
    }))
    .catch(err => next(err));
};

const editCinema = function (req, res, next) {
  const {
    cinemaId,
  } = req.params;

  Cinema
    .findByIdAndUpdate(
      cinemaId,
      req.body,
      {
        new: true
      }
    )
    .exec()
    .then(cinema => res.json({
      ...{
        name: cinema.name
      },
      ...{ success: true }
    }))
    .catch(err => next(err));

};

const deleteCinemaById = function (req, res, next) {
  const {
    cinemaId
  } = req.params;

  Cinema
    .findByIdAndRemove(cinemaId)
    .exec()
    .then(() => res.json({ success: true }))
    .catch(e => next(e));
};

module.exports = {
  getAllCinemas,
  addCinema,
  editCinema,
  deleteCinemaById
};