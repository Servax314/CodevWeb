const express = require('express')
const app = express()

app.set('view-engine', 'jade')

app.get('/', (req,res) => {
  res.render('login.jade')
})

app.get('/login', (req,res) => {
  res.render('login.jade')
})

app.get('/accueil', (req,res) => {
  res.render('accueil.jade')
})

app.listen(3000)
