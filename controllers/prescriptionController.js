const Prescription = require('../models/prescription');
const User = require('../models/user');
const { renderPage } = require('../utils/render-page');



const addPrescription = (req, res) => {
    const data = {
        pageName: 'Add Prescription',
        path: 'addPrescription'
    };
    return renderPage(res, 'pages/add-prescription', data, 'Add prescription Page');
};


const allPrescription = async (req, res, next) => {
    try {
        // Pull user from session
        const { _id } = req.session.user
        const userFilter = { _id }

        const searchAll = await Prescription.find({
            active: true,
            verify: false,
            creator: userFilter
        });
        return res.render('pages/all-prescription', {
            pageName: 'Add Prescription',
            path: 'addPrescription',
            data: searchAll
        })
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

};

const postPrescription = async (req, res, next) => {
    try {
        // Get user input from request body
        const { drugName, usage, duration, } = req.body;

        // Pull user from session
        const { _id } = req.session.user
        const userFilter = { _id }

        // Find User
        const findUser = await User.findById(userFilter)
        if (!findUser) return res.send("user not found")

        // Data to be sent
        const postData = {
            drugName,
            usage,
            duration,
            creator: findUser,
            userEmail: findUser.email
        };

        // Create prescription
        const response = await Prescription.create(postData);
        findUser.prescription.push(response);

        // Save user
        await findUser.save()
        return res.redirect('/all-prescription')
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

const removePrescription = async (req, res, next) => {
    const { prescriptionId } = req.params;
    try {
        const users = await Prescription.findByIdAndUpdate(prescriptionId, {
            active: 'false'
        });
        if (!users) return req.flash("error", "Not found !");

        return res.redirect('back')
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

const verifyPrescription = async (req, res, next) => {
    const { prescriptionId } = req.params;
    try {
        const users = await Prescription.findByIdAndUpdate(prescriptionId, {
            verify: 'true'
        });
        if (!users) return req.flash("error", "Not found !");

        return res.redirect('back')
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};



module.exports = {
    addPrescription,
    allPrescription,
    postPrescription,
    removePrescription,
    verifyPrescription
};