'use strict';

var bodyParser = require('body-parser');
var path = process.cwd();
//var user = require('../models/users.js');
var http = require('http');
var Yelp = require('yelp-v3');

require('dotenv').load();

module.exports=function(app, passport){
    
    app.use(bodyParser.json());
    
    app.get('/', function(req,res){
        res.render('index.html');
    });
    
    app.post('/post', function(req,res){
        
        console.log('success');
        
        var yelp = new Yelp({
            access_token: process.env.YELP_TOKEN,
        });
        
        yelp.search({term: 'bars', location: req.body.textdata})
        .then(function(data) {
            //console.log(data.businesses);
            res.end(JSON.stringify(data));
        })
        
        .catch(function(err){
            console.log('Error!');
            res.end(err);
        });
    });
    
    app.get('/mypost', function(req, res){
        
        var data = {'site' : 'auth/twitter'};
        console.log('Yeah!!');
        res.end(JSON.stringify(data));
        
        
        /*var barcount;
        
        user.find({barid: req.body.mybar}, function(err, docs){
            
            console.log(docs);
            barcount = docs.length;
        });
        
        
        user.find( { $and:[{ip: req.params.myip}, {barid: req.body.mybar}] }, function(err, docs){
            
            if(err) console.log('Error!');
            
            else if(docs.length == 0){
                
                new user({
                    
                    ip : req.headers['x-forwarded-for'],
                    barid: req.body.mybar,
                    going: true,
                    count: 1 + barcount
                    
                });
            }
            
        });
        
        
        var data = {mystatus: barcount+1}
        res.end(JSON.stringify(data));*/
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
        
        
        
        app.get('/auth/twitter', passport.authenticate('twitter'));
        
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/',
                failureRedirect : '/'
            }));
    
}


function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
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
