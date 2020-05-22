var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var photoSchema = new Schema({
  path: String;
  caption: String
});

module.exports = mongoose.model('Photo', photoSchema);
