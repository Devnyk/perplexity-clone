const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/oauth/google/callback"
}, 
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({ email: profile.emails[0].value });

        if (!user) {
            user = await userModel.create({
                username: profile.displayName.replace(/\s/g, "").toLowerCase(),
                email: profile.emails[0].value,
                fullName: {
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                },
                password: null // Google login users don't need password
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));


