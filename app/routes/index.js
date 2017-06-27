'use strict';

var bodyParser = require('body-parser');
var path = process.cwd();
var user = require('../models/locate.js');
var http = require('http');


module.exports=function(app){
    
    app.use(bodyParser.urlencoded({ extended: false }));
    
    app.get('/', function(req,res){
        res.render('index.html');
    });
    
    app.post('/post', function(req,res){
        
        console.log('success');
        console.log(req.body);
    });
    
}