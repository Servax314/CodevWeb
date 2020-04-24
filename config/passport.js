const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load User model
const User = require('../models/User.js');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({usernameField: 'username'}, (username,password,done) => {
      //Match Username
      User.findOne({username: username})
        .then(user =>{
          if(!user) {
            console.log('No user with such username');
            return done(null,false, {message: 'No user with such username'});
          }
          //Match password

          bcrypt.compare(password, user.password, (err,isMatch) => {
            if(err) throw err;

            if(isMatch) { 
              console.log('User ok to proceed')
              return done(null,user);
            }else{
              console.log('Incorrect password')
              return done(null,false,{message:'Incorrect password'});
            }
          });
        });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
