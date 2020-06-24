const mongoose = require('mongoose');

//User schema
const UserBanSchema = new mongoose.Schema({

  email:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  reason:{
    type: String,
    required: true
  }
});

//Generates MongoDB collection users
const UserBan = mongoose.model('UserBan', UserBanSchema)
module.exports = UserBan;
