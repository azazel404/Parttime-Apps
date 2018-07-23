const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const freetimeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    parttimerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    day: { type: String, required: true },
    timestart: { type: String, required: true },
    timeend: { type: String, required: true },
    status: { type: Boolean},
    

})
  

module.exports = mongoose.model('Freetimes', freetimeSchema);
