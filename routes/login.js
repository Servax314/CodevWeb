const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport')

//login page
router.get('/login', (req,res) => res.sendFile('login.html', { root: './views'}));

//login handler
router.post('/login', function(req,res,next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
  })(req,res,next);
});

module.exports = router;
