const passport = require('passport');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");




exports.register = (req, res, next) => {
  var hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(5), null);
  User.create({
    email: req.body.email,
    password: hashedPassword,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      var token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
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
  User.find({})
  .select("firstname lastname email")
    .then(result => {
      return res.status(200).json({data : result})
    })
    .catch(err => {
      return res.status(404).json({data: err})
    })
}

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate({id : req.body._id})
  .then(result => {
    return res.status(200).json({data : result})
  })
  .catch(err => {
    return res.status(404).json({data : err})
  })
}

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}
