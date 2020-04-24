const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')
const {checkNotAuthenticated} = require('../config/auth.js');


//login page
router.get('/login', checkNotAuthenticated, (req,res) => res.sendFile('login.html', { root: './views'}));

//login handler
router.post('/login', function(req,res,next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : 'Failed to log in, wrong password or username',
    successFlash : 'Logging in, welcome to the moula side.'
  })(req,res,next);

});

module.exports = router;
