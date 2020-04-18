const express = require('express')
const app = express()
const bcrypt = require('bcrypt')


const users = []

app.set('view-engine', 'jade')
app.use(express.urlencoded({extended: false}))

app.get('/', (req,res) => {
  res.render('login.jade')
})

app.get('/login', (req,res) => {
  res.render('login.jade')
})

app.post('/login', (req,res) => {

})

app.get('/register', (req,res) => {
  res.render('register.jade')
})

app.post('/register', async(req,res) => {
  try {
    const hashedPassword = bcrypt.hash
  }catch{

  }
})

app.listen(3000)
