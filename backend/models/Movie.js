var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: ''
  },
  trailer: {
    type: String,
    default: ''
  },
  censorRating: {
    type: String,
    default: ''
  },
  cast: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    default: []
  },
  duration: {
    type: Number,
  },
  releaseDate: {
    type: Date,
  },
  userRating: {
    type: Number,
  },
  languages: {
    type: [String],
  },
  genre: {
    type: [String],
  },
  cinemas: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' }],
    default: []
  }
});

module.exports = mongoose.model('Movie', MovieSchema, 'movies');