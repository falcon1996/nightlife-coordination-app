var User  = require('../models/users.js');
var configAuth = require('./auth');

var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport){
    
    passport.serializeUser(function(user,done){
        
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id,done){
        
        User.findById(id, function(err, user){
            done(err, user);
        });
    });
    
    
    passport.use(new TwitterStrategy({
        
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
    },
    function(token, tokenSecret, profile, done){
        
        process.nextTick(function(){
            
            User.findOne({ 'id' : profile.id }, function(err, user){
                
                if(err) return done(err);
                
                if(user) return done(null, user)
                
                else{
                    
                    var newUser = new User();
                    
                    newUser.id          = profile.id;
                    newUser.token       = token;
                    newUser.username    = profile.username;
                    newUser.displayName = profile.displayName;
                    
                    newUser.save(function(err){
                        
                        if(err) throw err;
                        
                        else return done(null, newUser);
                    })
                }
            })
        })
    }))
    
    
};
