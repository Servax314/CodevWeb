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

let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.readFile('./src/accueil.html', null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('Whoops! File not found!');
            reponse.write(error);
        } else {
            response.write(data);
        }
        response.end();
    });
};

http.createServer(handleRequest).listen(3000);
