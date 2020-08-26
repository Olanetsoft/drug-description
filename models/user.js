const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

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
    username: {
        type: String,
        default: 'username',
    },
    photo: {
        type: String,
        default: 'https://i.imgur.com/kyZfQzL.png'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
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