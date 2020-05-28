const express = require('express');
const router = express.Router();
var mongoose = require("mongoose");
const {spawn} = require('child_process');

const upload = require('../config/storageGF.js');

//upload handwritten document to db
router.post('/upload', upload.single('file'), function(req,res){
  res.redirect('/prediction')
});

router.get('/image/:filename', function(req,res) {
  const gfs = require('../server.js');
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  })
});

//download numerical document
router.get('/prediction', function(req,res){
  var dataToSend= 'Hello';
  const python = spawn('python3', ['../SimpleHTR/src/main.py', '../SimpleHTR/src/test1.jpg']);
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  python.on('close', (code) => {
    console.log(`child process closed`);
    res.json(dataToSend)
    //console.log(res)
  });
});

module.exports = router;
