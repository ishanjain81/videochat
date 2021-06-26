const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//Telling passport to use a New Strategy for Google Login
passport.use(new googleStrategy({
        clientID: process.env.WEB_GOOGLE_CLIENT_ID,
        clientSecret: process.env.WEB_GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/users/auth/google/callback',
    },
    function(accessToken,refreshToken,profile,done){
        // find a user 
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in google strategy-passport',err); return;}
            // console.log(accessToken,refreshToken);
            // console.log(profile);

            if(user){
                //if found set this user as req.user
                return done(null,user);
            }else{
                // if not found , create the user and set it as req.user
                User.create({
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')  // Setting a Random Password for a User
                },function(err, user){
                    if(err){console.log('error in creating user google strategy-passport',err); return;}

                    return done(null,user);
                });
            }
        });
    }

));

module.exports = passport;