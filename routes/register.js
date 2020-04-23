const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User model
const User = require('../models/User.js');

//register page
router.get('/register', (req,res) => res.sendFile('register.html', {root: './views'}))

//register handler
router.post('/register', function(req,res,next) {

  if( req.body.username && req.body.email && req.body.password1 && req.body.password2) {
    if( req.body.password1 === req.body.password2){
      User.findOne({$or:[{email: req.body.email}, {username: req.body.username}]})
        .then(user =>{
          if(user) {
            const err = new Error("Already existing user");
            err.status = 400;
            next(err);
          }else{
            const newUser = new User({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password1
            });

            //Hashing
            bcrypt.genSalt(10, (err,salt)=>
              bcrypt.hash(newUser.password,salt, (err,hash) => {
                if(err) throw err;

                newUser.password = hash;
                newUser.save()
                  .then(user =>{
                    res.redirect('/login');
                  })
                  .catch(err => console.log(err));
            }))

          }
        });
    }else{
      const err = new Error("Both password don't match");
      err.status = 400;
      next(err);
    }

  }else{
    const err = new Error("Fill all fields");
    err.status = 400;
    next(err);
  }

});

module.exports = router;
