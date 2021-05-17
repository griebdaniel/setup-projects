import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import cookieSession from 'cookie-session';
import express from 'express';

dotenv.config();

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user as string);
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
  return done(null as any, profile);
}));

//Unprotected Routes
app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

app.get('/failed', (req, res) => {
  res.send('<h1>Log in Failed :(</h1>');
});

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req: any, res: any, next: any) => {
  req.user ? next(): res.sendStatus(401);
};

//Protected Route.
app.get('/profile', checkUserLoggedIn, (req, res) => {
  res.send(`<h1>${(req.user as any).displayName}'s Profile Page</h1>`);
});

// Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/profile');
  }
);

//Logout
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

app.listen(3100, () => console.log(`App listening on port ${3100}`));

