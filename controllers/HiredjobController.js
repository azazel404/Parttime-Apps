const mongoose = require('mongoose');
const Hiredjob = require('../models/Hiredjobs');
const Jobs = require('../models/Jobs');
const User = require('../models/Users');


exports.test = (req, res, next) => {
    Hiredjob.find()
        .exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found" + err, data: next }));
}

exports.ShowApply = (req, res, next) => {
    Hiredjob.findOne({id : req.body.id})
        .exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found" + err, data: next }));
}

exports.AddApplyJob = (req, res, next) => {
   
    Hiredjob.create(req.body).then(function (result) {
        res.status(200).json({ message: "successfully save", data: result });
    }).catch(next);

};

