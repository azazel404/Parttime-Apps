const UserSchema = require("./Users");
const JobSchema = require("./Jobs");
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const hiredjobSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    job: [JobSchema],
    applicants: [UserSchema],
    employer: [UserSchema]

})

module.exports = mongoose.model('Hiredjobs', hiredjobSchema);
