// modules =================================================
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const rfs = require('rotating-file-stream')
const log4js = require('log4js');
var MongoStore = require('connect-mongo')(session);
const Queue = require('bull');
const { setQueues, UI } = require('bull-board');

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = new express();

let handleRequest = (request, response) => {
    app.get('/', function(req,resp) {
        reponse.sendFile('./src/accueil.html')
    });
};

http.createServer(handleRequest).listen(3000);
