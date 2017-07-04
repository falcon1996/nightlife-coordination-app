'use strict';

var bodyParser = require('body-parser');
var path = process.cwd();
var user = require('../models/users.js');
var status = require('../models/status.js');
var http = require('http');
var Yelp = require('yelp-v3');

require('dotenv').load();

module.exports=function(app){
    
    app.use(bodyParser.json());
    
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
    
    app.get('/get', function(req, res){
        
        var data = {mystatus: 'Going'}
        res.end(JSON.stringify(data));
    })
    
    
    app.route('/getmap')
        .get(function(req, res){
        
            var latitude = req.query.q ;
            var longitude = req.query.l;
            
            console.log(latitude);
            console.log(typeof latitude);
            console.log(longitude);
            console.log(typeof longitude);
            
            var data = {'latitude':latitude, 'longitude':longitude}
            
            //res.sendFile(path+ '/public/map.html');    
            res.render("../view/maps.jade", {pos:data});
            
        });
    
}

function myMap() {
    
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        
        center : new google.maps.LatLng(51.508742,-0.120850), 
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
