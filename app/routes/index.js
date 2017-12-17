'use strict';

var bodyParser = require('body-parser');
var path = process.cwd();
var User = require('../models/users.js');
var List = require('../models/rsvplist.js');
var http = require('http');
var Yelp = require('yelp-v3');

require('dotenv').load();

module.exports=function(app, passport){
    
    app.use(bodyParser.json());
    
    app.get('/', function(req,res){
        res.render('index.html');
    });
    
    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/')
    });
    
    app.post('/post', function(req,res){
        
        console.log('success! loaded all the bars.');
        
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
    
    
    app.post('/getlist',ensureAuthenticated, function(req,res){
        
       console.log(req.body);
       console.log('/getlist recieved');
       
       // user object in req is created by passport.js for every request in express.js
       //console.log(req.user);
       
       // Updating Personal rsvp List
       
       var loggedinUsername = req.user.username;
       
       List.findOneAndUpdate({username: loggedinUsername}, {$push:{mylist: req.body.index}}, {new: true}, function(err, doc){
           
           if(err) console.log("Error in updating RSVP list!");
           
           else{
               console.log(doc);
               res.end(JSON.stringify(doc));
           }
       });
       
       
       // Updating Bar's rsvp list
       
       User.findOne({barid: req.body.index}, function(err,bar){
           if(err) console.log("Error!");
           
           else if(!err && !bar){
               
               bar = new User({
                   barid: req.body.index,
                   count: 1
               });
               bar.save(function(err){
                   if(err) console.log(err);
                   
                   else{
                       console.log("Saving Bar..");
                   }
               })
           }
           
           else{
               
               User.update({barid: req.body.index}, {$inc: {count: 1}}, {new: true}, function(err, bar){
                   if(err) console.log("Error in editing Bar list!");
                   
                   else console.log(bar);
               })
           }
       })
       
    });
    
    app.post('/editlist',ensureAuthenticated, function(req,res){
        
        // Updating Personal rsvp List
        
        console.log(req.body);
        console.log("/editlist recieved!");
        var loggedinUser = req.user.username;
        
        List.findOneAndUpdate({username: loggedinUser}, {$pull:{mylist: req.body.index}}, {new: true}, function(err, doc){
            
            if(err) console.log("Error in editing RSVP list!");
            
            else{
                console.log(doc);
                res.end(JSON.stringify(doc));
            }
        });
        
        
        
        // Updating Bar's rsvp list
        
        User.findOneAndUpdate({barid: req.body.index}, {$inc: {count: -1}}, {new: true}, function(err, bar){
            
            if(err) console.log("Error in editing Bar list!");
            
            else{
                console.log(bar);
            }
        });
        
    });
    
    
    
    
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
        
        
        
        app.get('/auth/github', passport.authenticate('github'));
        
        app.get('/auth/github/callback',
            passport.authenticate('github', { failureRedirect : '/'}),
            function(req,res){
                res.redirect('/');
            });
    
}


// test authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
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
