const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const logger = require('log4js').getLogger('runtime');

//schema
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

//hashing
User.Schema.pre('save',function(next){
    var user = this;
    bcrypt.hash(user.password,10,function(err,hash){
      if(err){
        return next(err);
      }
      user.password = hash;
      next();
    })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
