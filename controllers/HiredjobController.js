const mongoose = require('mongoose');
const Hirejob = require('../models/Hirejobs');
const Jobs = require('../models/Jobs');
const User = require('../models/Users');


exports.ShowApply = (req, res, next) => {
    Hirejob.find()
        .populate("job", "applicants","employer")
    .exec()
        .then((result) => {
            res.status(200).json({ message: "successfully get", data: result });
        })
        .catch((err) => res.status(404).json({ message: "not found" + err, data: next }));
}

exports.AddApplyJob = (req, res, next) => {
    Jobs.findById(req.body.employeerId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "EmployeerId not found"
                });
            }
        })
    User.findById(req.body.parttimerId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "user not found"
                });
            }
        })
    const hirejob = new Hirejob({
        _id: new mongoose.Types.ObjectId(),
        job: req.body.employeerId,
        applicants: req.body.parttimerId,
        employer: req.body.parttimerId,
    })
    return hirejob.save()
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
