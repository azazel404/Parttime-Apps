const mongoose = require('mongoose');
const Hiredjob = require('../models/Hiredjobs');
const Jobs = require('../models/Jobs');
const User = require('../models/Users');


exports.test = (req, res, next) => {
    Hiredjob.find()
        .populate("jobs").populate("employeer")
        .exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found" + err, data: next }));
}

exports.ShowApply = (req, res, next) => {
    Hiredjob.findById(req.body.id)
        .populate("jobs").populate("employeer")
        .exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found" + err, data: next }));
}

exports.AddApplyJob = (req, res, next) => {
    // if (!req.body.jobsId) {
    //     return res.status(400).send({
    //         message: "Data can not be empty"
    //     });
    // }
    // Hiredjob.create(req.body).then(function (result) {
    //     res.status(200).json({ message: "successfully save", data: result });
    // }).catch(next);
    // if (!req.body.jobsId) {
    //     return res.status(400).send({
    //         message: "Data can not be empty"
    //     });
    // }
    const hirejobs = new Hiredjob({
        jobs: {
            day: req.body.jobs.day,
            timestart: req.body.jobs.timestart,
            timeend: req.body.jobs.timeend,
            startdate: req.body.jobs.startdate,
            enddate: req.body.jobs.enddate,
            position: req.body.jobs.position,
            description: req.body.jobs.description,
            salary: req.body.jobs.salary,
            location: req.body.jobs.location,
            status: req.body.jobs.status,
            employeerId: req.body.jobs.employeerId
        },
        applicants: {
            day: req.body.applicants.day,
            timestart: req.body.applicants.timestart,
            timeend: req.body.applicants.timeend,
            status: req.body.applicants.status,
            parttimerId: req.body.applicants.parttimerId
        },
        employeer: {
            day: req.body.employeer.day,
            timestart: req.body.employeer.timestart,
            timeend: req.body.employeer.timeend,
            status: req.body.employeer.status,
            parttimerId: req.body.employeer.parttimerId
        }
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

