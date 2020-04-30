const express = require('express');
const router = express.Router();

const upload = require('../config/storageGF.js');

//upload handwritten document to db
router.post('/upload', upload.single('file'), function(req,res){
  res.json({file: req,file});
});

//download numerical document

router.get('/download', function(req,res){

});

module.exports = router;
