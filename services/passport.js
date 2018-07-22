const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
let User = require('../models/Users');

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
            callbackURL: '/auth/google/callback',
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
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
                    displayName: profile.displayName
                }).save();
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);
