const mongoose = require('mongoose');

//User schema
const UserSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  admin:{
    type: Boolean,
    required: false
  }
});

//Generates MongoDB collection users
const User = mongoose.model('User', UserSchema)
module.exports = User;
