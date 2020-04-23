const express = require('express');
const router = express.Router();

//login page
router.get('/login', (req,res) => res.sendFile('login.html', { root: './views'}));

//login handler
router.post('/login', function(req,res) {

});

module.exports = router;
