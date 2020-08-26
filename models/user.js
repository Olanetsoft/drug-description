const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    // This is set intentionally incase there would be a feature upgrade
    username: {
        type: String,
        default: 'username',
    },
    // This is set intentionally incase there would be a feature upgrade
    photo: {
        type: String,
        default: 'https://i.imgur.com/kyZfQzL.png'
    },
    // This is set intentionally incase there would be a feature upgrade
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    // This is set intentionally incase there would be a feature upgrade
    phone: {
        type: String,
        default: '0-000000000'
    },
    active: {
        type: String,
        default: 'true'
    },
    prescription: [{
        type: Schema.Types.ObjectId,
        ref: 'Prescription'
    }],

}, { timestamps: true });

module.exports = mongoose.model('Users', userSchema);