var mongoose = require('mongoose');
// var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

/**
 * Auth schema
 */

var ActorSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  photo: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('Actor', ActorSchema, 'actors');
