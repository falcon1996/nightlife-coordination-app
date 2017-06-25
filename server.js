'use strict';

var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = process.cwd();

var app = express()

app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.render('index.html');
})

app.listen(8080, function(){
    console.log("Example of app listning on port 8080");
});
