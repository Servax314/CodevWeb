const express = require('express');
const mongoose = require('mongoose');
const flash = require('express-flash-messages');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./config/passport')(passport);

//db config
const db = require('./config/keys.js').MongoURI;

//connect to Mongo
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => console.log("mongo connected"))
  .catch(err => console.log(err));

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

//Global vars
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});

//routes
app.use('/',require('./routes/accueil.js'));
app.use('/',require('./routes/login.js'));
app.use('/',require('./routes/register.js'));

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
    req.flash('error', err.message);

    res.json({
        message: err.message,
        error: err
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(PORT));
