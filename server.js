var express = require('express');
var session = require('express-session');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
const port = 3000;
const app = express();

app.use(session({
    secret: 'hellodhir'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: 'giftreg.auth0.com',
    clientID: 'ycmrtza71T5CD8zCiR7OWzbx1tHURES9',
    clientSecret: '6LuFKOF4E4NqTZJUnUZne6wNF1ghfXfA2pEtXle6mNGdvNgPB8LgThFGOZNJ3Ild',
    callbackURL: 'http://localhost:3000/auth/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  app.get('/auth', passport.authenticate('auth0'));
  
  app.get('/auth/callback', passport.authenticate('auth0', { successRedirect: '/' }),
  function(req, res) {
    res.status(200).send(req.user);
  })

app.get('/auth/me', (req, res, next)=>{
    res.json(req.user);
})

  app.listen(port, ()=>{
      console.log('i be listening on ' + port);
  })