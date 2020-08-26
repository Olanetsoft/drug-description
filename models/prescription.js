const cron = require('node-cron');
const mongoose = require('mongoose');

const sendEmail = require('../utils/send-email');

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

}, { timestamps: true });

module.exports = mongoose.model('Prescriptions', prescriptionSchema);

// Reminder
cron.schedule('*/2 * * * *', () => {
    console.log('running every 2 min');
    const message = `This is a cron message`;

    sendEmail({
        email: 'heedris2olubisi@gmail.com',
        subject: 'REMINDER',
        message,
    });
});

// // Reminder
// cron.schedule('1-5 * * * *', () => {
//     console.log("---------------------");
//     console.log("Running Cron Job");
//     // Send e-mail
//     const message = `This is a cron message`;

//     sendEmail({
//         email: 'heedris2olubisi@gmail.com',
//         subject: 'WELCOME',
//         message,
//     });

//     // sendMail(mailOptions, function (error, info) {
//     //     if (error) {
//     //         console.log(error);
//     //     } else {
//     //         console.log('Email sent: ' + info.response);
//     //     }
//     // });
// });