const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
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