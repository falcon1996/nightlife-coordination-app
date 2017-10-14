'use strict';

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy
var flash = require('connect-flash');
var jade = require('jade');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = process.cwd();
var http = require('http');
var Yelp = require('yelp-v3');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var routes = require('./app/routes/index.js');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(session({secret: "customsessionsecret", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes(app, passport);

http.createServer(app).listen(8080, function(){
    console.log("Example of app listning on port 8080");
});
