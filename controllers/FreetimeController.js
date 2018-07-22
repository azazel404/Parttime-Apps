const mongoose = require('mongoose');
let Freetime = require('../models/Freetimes');


exports.index =  (req, res, next) => {
    Freetime.find().exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found", data: next }) );
}

exports.store = async (req, res, next) => {
    const freetimes = new Freetime({
        _id: new mongoose.Types.ObjectId(),
        day: req.body.day,
        timestart: req.body.timestart,
        timeend: req.body.timeend,
        status: req.body.status,
        
    });
    try {
        await freetimes.save();
        res.status(200).json({ message: "successfully create", data: freetimes });
    } catch (err) {
        res.status(404).json({ message: "not found", data: next })
    }
}

exports.show =  (req, res, next) => {
    Freetime.findById({ "_id": req.params.id }, (err, result) => {
        if (err) return res.send(err);
        res.status(200).json({ message: "successfully spesifik", data: result });
    })
}

exports.update =  (req, res, next) => {
    Freetime.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Freetime.findOne({ _id: req.params.id }).then(function (result) {
            res.status(200).json({ message: "successfully update", data: result });
        });
    }).catch(next);
}

exports.delete =  (req, res, next) => {
    const id = req.params.id;
    Freetime.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ sukses: "sukses delete" });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err,
                data : next
            });
        });
}