let Jobs = require('../models/Jobs');


exports.index = async (req, res, next) => {
    const jobs = await Jobs.find({ partimerId: req.user.id });
    res.send(jobs);
}

exports.show = async(req, res, next) => {
    const jobs = await Jobs.findOne({
        _id: req.params.id
    });
    res.send(jobs);
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
        res.send(jobs);
    } catch (err) {
        res.send(400, err);
    }
}
exports.update = async (req, res, next) => {
    const id = req.params.id;
    const UpdateJob = {};
    for (const JobUpdate of req.body) {
        UpdateJob[JobUpdate.propNameFreetime] = JobUpdate.value;
    }
    const jobs = await Jobs.update({ _id: id }, { $set: update_product })
    try {
        jobs.exec().then((result) => {
            res.status(200).json({ sukses: "sukses update", data: result });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    } catch (err) {
        throw err;
    }
}

exports.delete = async (req, res, next) => {
    const jobs = await Jobs.remove({
        _id: req.params.id
    });
    res.send(jobs);
}