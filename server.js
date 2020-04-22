const express = require('express');
const mongoose = require('mongoose');

const app = express();

//db config
const db = require('./config/keys.js').MongoURI;

//connect to Mongo
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => console.log("mongo connected"))
  .catch(err => console.log(err));

app.use(express.static(__dirname + '/public'));

//BodyParser
app.use(express.urlencoded({extended:false}));

//routes
app.use('/',require('./routes/accueil.js'));
app.use('/',require('./routes/login.js'));
app.use('/',require('./routes/register.js'));

app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    res.json({'errors': {
        message: err.message,
        error: err
    }});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(PORT));
