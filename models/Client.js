const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    tel: String,
    avatar: String,
    address: String
})

const Client = mongoose.model('client', clientSchema);

module.exports = Client;