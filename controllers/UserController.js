const passport = require('passport');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");




exports.register = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('error the server');
    if (!user) return res.status(404).send('user not found');
    var PasswordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!PasswordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: 86400
    });
    res.status(200).send({ auth: true, token: token });
  })
}

exports.updatePassword = (req, res, next) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null);
  User.findOneAndUpdate({ email: req.body.email }, {
    email: req.body.email,
    password: hashedPassword,
  }, { new: true })
    .exec()
    .then(result => {
      res.status(200).json({ sukses: "sukses update", data: result });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        data: next
      });
    });
}

exports.indexUser = (req, res, next) => {
 
}

exports.updateUser = (req, res, next) => {
 
}

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}
