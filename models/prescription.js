const mongoose = require('mongoose');

const {
    Schema
} = mongoose;

const prescriptionSchema = new mongoose.Schema({
    drugName: {
        type: String,
        required: true
    },
    usage: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    active: {
        type: String,
        default: 'true'
    },
    verify: {
        type: String,
        default: 'false'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    userEmail: {
        type: String
    },

}, { timestamps: true });


module.exports = mongoose.model('Prescriptions', prescriptionSchema);




