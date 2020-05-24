const express = require('express');
const router = express.Router();
var mongoose = require("mongoose");
//var Photo = require('../models/Photo.js');

const upload = require('../config/storageGF.js');

//upload handwritten document to db
router.post('/upload', upload.single('file'), function(req,res){
  console.log(res,req)
  res.json({file: req.file});
});


//download numerical document
router.get('/download', function(req,res){

});

module.exports = router;
