const express = require('express');
const router = express.Router();
const {checkAuthenticated} = require('../config/auth.js');

//accueil page
router.get('/', checkAuthenticated, (req,res) => res.sendFile('accueil.html', { root: './views'}));

module.exports = router;
