var mongoose = require('mongoose');
// var userPlugin = require('mongoose-user');
var Schema = mongoose.Schema;

var ActorSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  photo: {
    type: String,
    default: ''
  },
  roleName: {
    type: String,
  }
});

module.exports = mongoose.model('Actor', ActorSchema, 'actors');
