const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const freetimeSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    day: { type: String, required: true },
    timestart: { type: String, required: true },
    timeend: { type: String, required: true },
    status: { type: Boolean},
    partimerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },

})
  

module.exports = mongoose.model('Freetimes', freetimeSchema);
