var express = require('express');
var router = express.Router();
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((user, done) => {
done(null, user)
});

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Express' });
});

passport.use(new GoogleStrategy({
clientID: "374144058929-prr1dcsdg62q6d2f2v1n263dt1vg4j8k.apps.googleusercontent.com", // Add your clientID
clientSecret: "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", // Add the secret here
callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
done(null, profile, accessToken );
}));

// Googe Oauth2
router.get('/auth/google', passport.authenticate('google', {
scope: ['profile', 'email'],
}));

// Google Oauth2 callback url
router.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
res.redirect("http://localhost:3000?id=" + req.user.id);
});

module.exports = router;