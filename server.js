'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var jade = require('jade');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = process.cwd();
var http = require('http');
var Yelp = require('yelp-v3');
//var cookieParser = require('cookie-parser');
//var session = require('express-session');

var routes = require('./app/routes/index.js');

var app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;


app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


routes(app);

http.createServer(app).listen(8080, function(){
    console.log("Example of app listning on port 8080");
});
