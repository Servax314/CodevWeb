if(process.env.NODE_ENV !== 'production'){
  require('dotenv')
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'jade')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', checkAuthenticated, (req,res) => {
  res.render('accueil.jade')
})

app.get('/login', checkNotAuthenticated, (req,res) => {
  res.render('login.jade')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req,res) => {
  res.render('login.jade')
})

app.post('/register', checkNotAuthenticated, async(req,res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      email: req.body.mailAddress,
      password: hashedPassword
    })
    res.status = 200
    res.redirect('/login')
  }catch{
    res.status = 404
    res.redirect('/register')
  }
  console.log(users)
})

app.get('/accueil', (req,res) => {
  res.render('register.jade')
})

//middle-ware
function checkAuthenticated(req,res,next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req,res,next) {
  if(req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(3000)
