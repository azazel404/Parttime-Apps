const mongoose = require('mongoose');
const Jobs = require('../models/Jobs');
const User = require('../models/Users');

exports.index =  (req, res, next) => {
    Jobs.find()
        .populate('employeerId')
    .exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found", data: next }));
}

exports.store =  (req, res, next) => {

    User.findById(req.body.employeerId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "EmployeerId not found"
                });
            }
            const jobs = new Jobs({
                _id: new mongoose.Types.ObjectId(),
                day: req.body.day,
                timestart: req.body.timestart,
                timeend: req.body.timeend,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                position: req.body.position,
                description: req.body.description,
                salary: req.body.salary,
                location: req.body.location,
                status: req.body.status,
                employeerId: req.body.employeerId
            });
            return jobs.save();
        })
        .then(result => {
            res.status(200).json({ message: "successfully create", data: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                data: next
            });
        });
    
}

exports.show = (req, res, next) => {
    const id = req.params.employeerId;
    Jobs.findById(id)
        .populate('employeerId')
        .exec()
        .then(result => {
            res.status(200).json({ message: "successfully show", data: result });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ err: err });
        })

}

exports.update = async (req, res, next) => {
    const id = req.params.employeerId;
    Jobs.findByIdAndUpdate(id, req.body).then(function () {
        Jobs.findOne({ _id: req.params.id }).then(function (result) {
            res.status(200).json({ message: "successfully update", data: result });
        });
    }).catch(next);
}

exports.delete = async (req, res, next) => {
    const id = req.params.employeerId;
    Jobs.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ sukses: "sukses delete" });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err,
                data: next
            });
        });
}