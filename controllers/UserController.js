const passport = require('passport');
const User = require('../models/Users');
require('../services/passport');

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
  User.find().exec()
    .then((result) => {
      res.status(200).json({ message: "successfully get", data: result });
    })
    .catch((err) => res.status(404).json({ message: "not found", data: next }));
}

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}
