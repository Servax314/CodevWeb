const express = require('express');
const router = express.Router();
const {checkAuthenticated} = require('../config/auth.js');

router.get('/admin', checkAuthenticated, (req,res) => res.sendFile('admin.html', { root: './views'}));

module.exports = router;
