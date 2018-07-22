const mongoose = require('mongoose');
const passport = require('passport');
let User = require('../models/Users');


exports.authFacebook = (req, res, next) => {
  passport.authenticate('facebook', {
    scope: ['email'] });
   
}

exports.authFacebookCallback = (req, res, next) => {
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
}

exports.currentUser = (req, res, next) => {
  res.send(req.user);
}

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}
