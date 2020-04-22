const express = require('express');
const router = express.Router();

//accueil page
router.get('/', (req,res) => res.sendFile('accueil.html', { root: './views'}));

module.exports = router;
