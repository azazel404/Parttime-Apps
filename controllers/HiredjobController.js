const mongoose = require('mongoose');
const Hirejob = require('../models/Hiredjobs');
const Jobs = require('../models/Jobs');
const User = require('../models/Users');


// exports.test = (req, res, next) => {
//     Hirejob.find()
//         .populate("jobs").populate("employeer")
//         .exec()
//         .then((result) => {
//             res.status(200).json({ message: "successfully get", data: result });
//         })
//         .catch((err) => res.status(404).json({ message: "not found" + err, data: next }));
// }

exports.ShowApply = (req, res, next) => {
    Hirejob.findOne({"_id": req.params.id})
        .populate("jobs").populate("employeer")
    .exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found" + err, data: next }));
}

exports.AddApplyJob = (req, res, next) => {
    if (!req.body.jobsId) {
        return res.status(400).send({
            message: "Data can not be empty"
        });
    }
    const hirejobs = new Hirejob({
        _id: new mongoose.Types.ObjectId(),
        jobs: req.body.jobsId,
        applicants: req.body.applicants,
        employeer: req.body.employeer,
    });

    hirejobs.save()
        .then(data => {
            res.status(200).json({ message: "successfully save", data: data });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the data."
            });
        });
};

