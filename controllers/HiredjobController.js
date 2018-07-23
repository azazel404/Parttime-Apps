let Hirejob = require('../models/Hirejobs');


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
    Hirejob.findOneOrCreate({ _id: req.params.id }, req.body).then(function () {
        Hirejob.findOne({ _id: req.params.id }).then(function (result) {
            res.status(200).json({ message: "successfully create", data: result });
        });
    }).catch(next);

}
