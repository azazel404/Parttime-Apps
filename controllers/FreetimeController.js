let Freetime = require('../models/Freetimes');


exports.index = async (req, res, next) => {
    const freetimes = await Freetime.find({ partimerId: req.user.id });
    freetimes.exec()
        .then((result) => {
            res.status(200).json({ sukses: "sukses ", data: result });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.store = async (req, res, next) => {
    const freetimes = new Freetime({
        _id: new mongoose.Types.ObjectId(),
        day: req.body.day,
        timestart: req.body.timestart,
        timeend: req.body.timeend,
        status: req.body.status,
        partimerId: req.user.id
    });
    try {
        await freetimes.save();
        res.send(freetimes);
    } catch (err) {
        res.send(400, err);
    }
}

exports.show = async (req, res, next) => {
    const freetimes = await Freetime.findOne({
        partimerId: req.user.id,
        _id: req.params.id
    });
    freetimes.exec()
        .then((result) => {
            res.status(200).json({ sukses: "sukses show", data: result });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const UpdateFreetime = {};
    for (const FreetimeUpdate of req.body) {
        UpdateFreetime[FreetimeUpdate.propNameFreetime] = FreetimeUpdate.value;
    }
    const freetimes = await Freetime.update({ _id: id }, { $set: update_product })
    try {
        freetimes.exec().then((result) => {
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
    const freetimes = await Freetime.remove({
        partimerId: req.user.id,
        _id: req.params.id
    });
    freetimes.exec()
        .then((result) => {
            res.status(200).json({ sukses: "sukses delete", data: result });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}