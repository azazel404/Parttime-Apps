// const UserSchema = require("./Users");
const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const jobSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    day: { type: String, required: true },
    timestart: { type: String, required: true },
    timeend: { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    status: { type: Boolean },
    // employeer: [UserSchema]
    


})


module.exports = mongoose.model('Jobs', jobSchema);
