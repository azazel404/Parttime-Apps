const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    facebookId: { type: String, required: true },
    username: { type: String, required: true },
    picture: { type: String, required: true },
    email: { type: String, required : true },

})


module.exports = mongoose.model('Users', userSchema);
