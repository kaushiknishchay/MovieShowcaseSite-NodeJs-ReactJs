var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShowTimingSchema = new Schema({
  showDate: {
    type: Date,
    required: true,
  },
  showTimesAndPrice: [{
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
  }],
  screenType: {
    type: String, // 2D, 3D, IMAX 3D, 4D
    default: '2D'
  },
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  }
});

module.exports = mongoose.model('ShowTiming', ShowTimingSchema, 'showtimings');