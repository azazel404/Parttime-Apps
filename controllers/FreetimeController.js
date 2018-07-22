let Freetime = require('../models/Freetimes');


exports.index = async (req, res, next) => {
    const freetimes = await Freetime.find({ partimerId: req.user.id });
    res.send(freetimes);
}

exports.store = async (req, res, next) => {
2
}

exports.show = async (req, res, next) => {
    const freetimes = await Freetime.findOne({
        partimerId: req.user.id,
        _id: req.params.id
    });
    res.send(freetimes);
}

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const update_freetime = {};
    for (const freetime_update of req.body) {
        update_freetime[freetime_update.propNameFreetime] = freetime_update.value;
    }
    const freetimes = await Freetime.update({ _id: id }, { $set: update_product })
    try{
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

exports.delete =  async (req, res, next) => {
    const freetimes = await Freetime.remove({
        partimerId: req.user.id,
        _id: req.params.id
    });
    res.send(freetimes);
}