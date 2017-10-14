var User  = require('../models/users.js');
var List  = require('../models/rsvplist.js');

var configAuth = require('./auth');

var GithubStrategy = require('passport-github').Strategy

module.exports = function(passport){
    
    passport.serializeUser(function(user,done){
        
        done(null, user);
    });
    
    passport.deserializeUser(function(id,done){
        
        User.findById(function(user, done){
            done(null, user);
        });
    });
    
    
    passport.use(new GithubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
            
        console.log(profile.username);
        
        List.find({ username: profile.username}, function(err, docs){
            
            
            
            if(docs.length) console.log('Welcome'+ profile.username);
            
            else if(!docs.length){
                
                new List({
                    
                    username : profile.username,
                    //mylist : [0]
                    
                })
            }
        });
        
        return done(null, profile);
        
      }));

};