var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var List = require('../models/rsvplist');
var configAuth = require('./auth');

module.exports = function(passport){
    
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    
    
    
    passport.use(new GitHubStrategy({
    
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
    
    },
    function(accessToken, refreshToken, profile, done){
        
        //console.log(profile.username)
        
        List.findOne({username: profile.username}, function(err,user){
            
            if(err) console.log(err);
            
            else if(!err && user!=null){
                
                /*
                user.remove({}, function(err) { 
                   console.log('collection removed') 
                });*/
                
                
                console.log("Welcome "+profile.displayName+"!");
                //console.log(user);
                done(null, user);
            }
            
            else{
                
                user = new List({
                    username: profile.username,
                    name: profile.displayName,
                    mylist: []
                });
                user.save(function(err){
                    if(err) console.log(err);
                    
                    else{
                        console.log("Saving User..");
                        done(null, user);
                    }
                });
            }
        });
        
        return done(null, profile);

    }));

};