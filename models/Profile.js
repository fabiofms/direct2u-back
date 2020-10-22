const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    birthdate: Date
})

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;