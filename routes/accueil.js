const express = require('express');
const router = express.Router();
const {checkAuthenticated} = require('../config/auth.js');

//accueil page
router.get('/', checkAuthenticated, (req,res) => res.sendFile('accueil.html', { root: './views'}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

module.exports = router;
