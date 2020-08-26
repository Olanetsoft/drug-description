const {
    renderPage
} = require('../utils/render-page');

const addPrescription = (req, res) => {
    const data = {
        message: 'This is add description page',
        firstName: 'John',
        lastName: 'Doe',
        pageName: 'Add Prescription',
        path: 'addPrescription'
    };

    return renderPage(res, 'pages/add-prescription', data, 'Add prescription Page');
};

const allPrescription = (req, res) => {
    const data = {
        message: 'This is add description page',
        firstName: 'John',
        lastName: 'Doe',
        pageName: 'All Prescription',
        path: 'allPrescription'
    };

    return renderPage(res, 'pages/all-prescription', data, 'All prescription Page');
};

module.exports = {
    addPrescription,
    allPrescription,
};