const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const logger = require('log4js').getLogger('runtime');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
