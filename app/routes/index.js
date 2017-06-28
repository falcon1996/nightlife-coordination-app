'use strict';

var bodyParser = require('body-parser');
var path = process.cwd();
var user = require('../models/locate.js');
var http = require('http');
var Yelp = require('yelp-v3');

require('dotenv').load();

module.exports=function(app){
    
    app.use(bodyParser.urlencoded({ extended: false }));
    
    app.get('/', function(req,res){
        res.render('index.html');
    });
    
    app.post('/post', function(req,res){
        
        console.log('success');
        console.log(req.body.textdata);
        
        var yelp = new Yelp({
            access_token: process.env.YELP_TOKEN,
        });
        
        yelp.search({term: 'bars', location: req.body.textdata})
        .then(function(data) {
            console.log(data.businesses);
            res.end(JSON.stringify(data));
        })
        
        .catch(function(err){
            console.log('Error!');
            res.end(err);
        });
    });
    
}
