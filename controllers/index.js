const {
    renderPage
} = require('../utils/render-page');

const home = (req, res) => {
    const data = {
        message: 'This is a General Home Page',
        firstName: 'John',
        lastName: 'Doe',
        pageName: 'Home',
        path: 'home'
    };

    return renderPage(res, 'index', data, 'Demo Page');
};

module.exports = {
    home
};