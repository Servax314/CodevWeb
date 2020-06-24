const express = require('express');
const router = express.Router();
const {checkAdmin} = require('../config/auth.js');

router.get('/admin', checkAdmin, (req,res) => res.sendFile('admin.html', { root: './views'}));

module.exports = router;
