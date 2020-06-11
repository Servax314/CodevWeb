const express = require('express');
const router = express.Router();
var mongoose = require("mongoose");
const {spawn} = require('child_process');
const path = require('path');
var fs = require('fs');

const upload = require('../config/storageGF.js');

//upload handwritten document to db
router.post('/upload', upload.single('file'), function(req,res){
  res.redirect('/prediction/80723457892345789234578901345')
});

router.get('/image/:filename', function(req,res) {
  const gfs = require('../server.js');
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  })
});

//download numerical document
router.get('/prediction/:id', function(req,res){
  var dataToSend;
  const python = spawn('python3', ['/Users/NicolasServot/Desktop/Hackathon/CodevWeb/SimpleHTR/src/main.py', '/Users/NicolasServot/Desktop/Hackathon/CodevWeb/SimpleHTR/src/test1.png']);
  const python2 = spawn('python3', ['/home/hugo/Documents/ML/Project/CodevWeb/SimpleHTR/src/main.py', '/home/hugo/Documents/ML/Project/CodevWeb/SimpleHTR/src/test1.png']);
  python2.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  python2.on('close', (code) => {
    console.log(`child process closed`);
    fs.appendFile('log.txt', dataToSend, function (err) {
  if (err) {
    next();
  } else {
    // done
  }
})
    res.send(dataToSend)
    //console.log(res)
  });
});

module.exports = router;
