const express = require('express');
const router = express.Router();
var mongoose = require("mongoose");
const {spawn} = require('child_process');
const path = require('path');
var fs = require('fs');
const {checkAuthenticated, checkAdmin} = require('../config/auth.js');
const upload = require('../config/storageGF.js');

const vision = require('@google-cloud/vision');

//upload handwritten document to db
router.post('/upload',checkAuthenticated, upload.single('file'), function(req,res){
  
  console.log(req.file)
  const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com'};
  const client = new vision.ImageAnnotatorClient();
  const result = client.documentTextDetection(
    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/126259992/original/d377377b6758a398b9ab6cbe1d27fd536acfcca8/convert-any-handwritten-english-or-hindi-text-to-word-or-excel.jpg'
  )
    .then(result => {
      console.log(result)
      const fullTextAnnotation = result[0].fullTextAnnotation;
      console.log(fullTextAnnotation.text);
    });


});

router.get('/image/:filename', checkAdmin, function(req,res) {
  const gfs = require('../server.js');
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  })
});

//download numerical document
router.get('/prediction/:id',checkAuthenticated, function(req,res){

});

module.exports = router;
