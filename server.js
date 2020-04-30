const express = require('express');
const mongoose = require('mongoose');
const flash = require('express-flash-messages');
const session = require('express-session');
const passport = require('passport');

const multer = require('multer');
const Grid = require('gridfs-stream');

const app = express();

require('./config/passport')(passport);

//db config
const db = require('./config/keys.js').MongoURI;

//connect to Mongo
let gfs;
const conn = mongoose.createConnection(db, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true  });
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true})
//   .then(() =>
//     console.log("mongo connected")
//   )
//   .catch(err => console.log(err));

app.use(express.static(__dirname + '/public'));

//BodyParser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Express session
app.use(session({
  secret: 'xdxd',
  resave: true,
  saveUninitialized: true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash());

//routes
app.use('/',require('./routes/accueil.js'));
app.use('/',require('./routes/login.js'));
app.use('/',require('./routes/register.js'));
app.use('/upload', require('./routes/documents.js'));
app.use('/download', require('./routes/documents.js'));

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);


    res.json({
        message: err.message,
        error: err
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(PORT));
