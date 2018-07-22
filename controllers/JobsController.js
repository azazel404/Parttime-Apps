const mongoose = require('mongoose');
let Jobs = require('../models/Jobs');


exports.index =  (req, res, next) => {
    Jobs.find().exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found", data: next }));
}

exports.store = async (req, res, next) => {
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
        status: req.body.status
    });
    try {
        await jobs.save();
        res.status(200).json({ message: "successfully create", data: jobs });
    } catch (err) {
        res.send(400, err);
    }
}

exports.show = (req, res, next) => {
    Jobs.findById({ "_id": req.params.id }, (err, result) => {
        if (err) return res.send(err);
        res.status(200).json({ message: "successfully spesifik", data: result });
    })
}

exports.update = async (req, res, next) => {
    Jobs.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Jobs.findOne({ _id: req.params.id }).then(function (result) {
            res.status(200).json({ message: "successfully update", data: result });
        });
    }).catch(next);
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
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