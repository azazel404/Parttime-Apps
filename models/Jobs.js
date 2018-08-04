const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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
module.exports = mongoose.model('Jobs', jobSchema);
