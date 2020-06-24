const express = require('express');
const router = express.Router();
var mongoose = require("mongoose");
const {spawn} = require('child_process');
const path = require('path');
const fse = require('fs-extra');
const multer = require("multer");
const {checkAuthenticated, checkAdmin} = require('../config/auth.js');
const upload = require('../config/storageGF.js');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('fileUpload/'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"." + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
})
const uploadLocal = multer({ storage: storage })


const vision = require('@google-cloud/vision');

//upload handwritten document to db
router.post('/upload',checkAuthenticated,  uploadLocal.single('file'), function(req,res){
  const fileName = req.file.filename
  filePath = path.resolve('fileUpload/' + fileName)
  const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com'};
  const client = new vision.ImageAnnotatorClient();
  const result = client.documentTextDetection(filePath)
    .then(result => {
      const fullTextAnnotation = result[0].fullTextAnnotation;
      fse.outputFile(path.resolve('textDownload/'+fileName.split('.')[fileName.split('.').length -2]+'.txt'), fullTextAnnotation.text, err => {
          if(err) {
            console.log(err);
          } else {
            console.log('The file was saved!');
          }
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
