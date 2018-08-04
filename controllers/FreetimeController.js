const mongoose = require('mongoose');
const Freetime = require('../models/Freetimes');
const User = require('../models/Users');

exports.index = (req, res, next) => {
    Freetime.find()
        .populate("parttimerId")
    .exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found" + err, data: next }));
}

exports.store = (req, res, next) => {
    User.findById(req.body.parttimerId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "user not found"
                });
            }
            const freetimes = new Freetime({
                day: req.body.day,
                timestart: req.body.timestart,
                timeend: req.body.timeend,
                status: req.body.status,
                parttimerId: req.body.parttimerId
            });
            return freetimes.save();
        })
        .then(result => {
            res.status(200).json({ message: "successfully create", data: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                data : next
            });
        });

}

exports.show = (req, res, next) => {
    const id = req.params.parttimerId;
    Freetime.findById(id)
        .populate('parttimerId')
        .exec()
        .then(result => {
            res.status(200).json({ message: "successfully show", data: result });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ err: err });
        })
}

exports.update = (req, res, next) => {
    const id = req.params.parttimerId;
    Freetime.findByIdAndUpdate(id, req.body).then(function () {
        Freetime.findOne({ _id: req.params.id }).then(function (result) {
            res.status(200).json({ message: "successfully update", data: result });
        });
    }).catch(next);
}

exports.delete = (req, res, next) => {
    const id = req.params.parttimerId;
    Freetime.remove({ _id: id })
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