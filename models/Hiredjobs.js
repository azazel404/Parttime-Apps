const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    facebookId: { type: String, required: true },
    username: { type: String, required: true },
    picture: { type: String, required: true },
    email: { type: String, required: true },

})

const jobSchema = new Schema({
    day: { type: String, required: true },
    employeerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    timestart: { type: String, required: true },
    timeend: { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    status: { type: Boolean }
})

const hiredjobSchema = new Schema({
    jobs: jobSchema,
    applicants: userSchema,
    employeer: userSchema

})

module.exports = mongoose.model('Hiredjobs', hiredjobSchema);
