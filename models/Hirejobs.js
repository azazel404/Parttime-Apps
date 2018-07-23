const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const hiredjobSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobs', required: true },
    applicants: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }

})

module.exports = mongoose.model('Hiredjobs', hiredjobSchema);
