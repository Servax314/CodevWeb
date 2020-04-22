const express = require('express');
const router = express.Router();

//register page
router.get('/register', (req,res) => res.sendFile('register.html', {root: './views'}))

module.exports = router;
