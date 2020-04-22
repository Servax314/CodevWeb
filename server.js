const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

//routes
app.use('/',require('./routes/accueil.js'));
app.use('/',require('./routes/login.js'));
app.use('/',require('./routes/register.js'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(PORT));
