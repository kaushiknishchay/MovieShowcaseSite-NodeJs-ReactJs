var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: ''
  },
  screenTypes: {
    type: [String], // 2D, 3D, IMAX 3D, 4D
    default: ''
  }
});

module.exports = mongoose.model('Cinema', CinemaSchema, 'cinemas');