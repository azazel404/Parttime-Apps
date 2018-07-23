const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
require('../models/Users');
const User = mongoose.model('Users');
const cookie = require("../services/develop");



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});



passport.use(
    new FacebookStrategy(
        {
            callbackURL: '/auth/facebook/callback',
            clientID: cookie.facebokClientID,
            clientSecret: cookie.facebokClientSecret,
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("data hendra", profile);
            try {
                const existingUser = await User.findOne({ facebookId: profile.id });
                if (existingUser) {
                    return done(null, existingUser);
                }
                const user = await new User({
                    facebookId: profile.id,
                    displayName: profile.name.givenName + " " + profile.name.familyName,
                    picture: profile.picture,
                    email : profile.email
                }).save();
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);
