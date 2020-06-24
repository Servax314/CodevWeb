const express = require('express');
const router = express.Router();
var mongoose = require("mongoose");
const {spawn} = require('child_process');
const path = require('path');
var fs = require('fs');
const multer = require("multer");
const {checkAuthenticated, checkAdmin} = require('../config/auth.js');
const upload = require('../config/storageGF.js');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('abc/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"." + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})

const uploadLocal = multer({ storage: storage })


const vision = require('@google-cloud/vision');

//upload handwritten document to db
router.post('/upload',checkAuthenticated,  uploadLocal.single('file'), function(req,res){
  console.log(req.file.filename)
  filePath = path.resolve('abc/' + req.file.filename)
  const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com'};
  const client = new vision.ImageAnnotatorClient();
  const result = client.documentTextDetection(filePath)
    .then(result => {
      const fullTextAnnotation = result[0].fullTextAnnotation;
      console.log(`Full text: ${fullTextAnnotation.text}`);
      fullTextAnnotation.pages.forEach(page => {
        page.blocks.forEach(block => {
          console.log(`Block confidence: ${block.confidence}`);
          block.paragraphs.forEach(paragraph => {
            console.log(`Paragraph confidence: ${paragraph.confidence}`);
            paragraph.words.forEach(word => {
              const wordText = word.symbols.map(s => s.text).join('');
              console.log(`Word text: ${wordText}`);
              console.log(`Word confidence: ${word.confidence}`);
              word.symbols.forEach(symbol => {
                console.log(`Symbol text: ${symbol.text}`);
                console.log(`Symbol confidence: ${symbol.confidence}`);
        });
      });
    });
  });
});
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
