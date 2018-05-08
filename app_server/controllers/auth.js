/* jshint esversion: 6 */
const passport = require('passport');
const mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/users');

passport.use(new Strategy({
    clientID: '168126427354074',
    clientSecret: '53335c45156e66fa96d9e650edf7d6c7', 
    callbackURL: "https://hstournament.herokuapp.com/auth/facebook/callback"
    //callbackURL: "https://8e33f2df.ngrok.io/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //check user table for anyone with a facebook ID of profile.id
    User.findOne({
        'facebookid': profile.id 
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new User({
                username: profile.displayName,
             //   email: profile.emails[0].value,
                facebookid: profile.id,
                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                facebook: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            //found user. Return
            return done(err, user);
        }
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  module.exports = passport;
  