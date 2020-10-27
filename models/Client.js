const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: false
    },
    tel: {
        type: String
    },
    address: {
        type: String
    }
})

const Client = mongoose.model('client', clientSchema);

module.exports = Client;