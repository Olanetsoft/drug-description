const { renderPage } = require('../utils/render-page');

const home = (req, res) => {
    const data = {
        pageName: 'Home',
        path: 'home'
    };
    return renderPage(res, 'index', data, 'Demo Page');
};

module.exports = {
    home
};