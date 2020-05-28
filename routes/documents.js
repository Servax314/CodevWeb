const express = require('express');
const router = express.Router();
var mongoose = require("mongoose");

const upload = require('../config/storageGF.js');

//upload handwritten document to db
router.post('/upload', upload.single('file'), function(req,res){
  console.log(res,req)
  res.redirect('/login')
});

router.get('/image/:filename', function(req,res) {
  const gfs = require('../server.js');
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  })
});

//download numerical document
router.get('/download', function(req,res){

});

module.exports = router;
