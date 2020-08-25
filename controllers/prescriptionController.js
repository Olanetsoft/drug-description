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

module.exports = {
    addPrescription
};