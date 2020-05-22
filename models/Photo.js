var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
  path: String,
  caption: String
});

const Photo = mongoose.model('Photo', PhotoSchema)
module.exports = Photo;
