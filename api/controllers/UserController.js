const mongoose = require('mongoose')
const User = require('../models/user')

exports.index = (req, res, next) => {
    User.find()
    .select('name password').exec()
    .then( doc => {
        res.status(200).json(doc)
    }).catch( err => {
        res.status(500).json({message: 'user empty'})
    })
}

exports.store = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password
    })
    user.save().then( result => {
        res.status(200).json(result)
    }).catch( err => {
        res.status(500).json(err)
    })
}

exports.show = (req, res, next) => {
    User.findById(req.params.id).exec().then(doc => {
        doc ? res.status(200).json(doc) : res.status(200).json({message: 'no valid entry found'})
    }).catch( err => {
        res.status(500).json({
            message: err
        })
    })
}

exports.update = (req, res, next) => {
    User.update({ _id: req.params.id }, { $set: {
        name: req.body.name,
        password: req.body.password
    } }).exec().then( result => {
        res.status(200).json(result)
    }).catch( err => {
        res.status(500).json({ message: err })
    })
}

exports.delete = (req, res, next) => {
    User.remove({_id: req.params.id}).exec().then( result => {
        res.status(200).json(result)
    }).catch( err => {
        res.status(500).json({message: err})
    })
}