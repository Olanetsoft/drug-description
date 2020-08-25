const { validationResult } = require('express-validator');

const { renderPage } = require('./render-page');


const validateUserRequest = (req, res, email, password) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        const data = {
            pageName: 'User SignIn',
            success: req.flash('success'),
            errorMessage,
            oldInput: {
                email,
                password,
            },
            validationErrors: errors.array(),
        }
        renderPage(res, 'auth/login', data, 'User Login', '/login')
    }
};

const validateUserRegistration = (req, res, oldInput) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        const data = {
            pageName: 'User Registration',
            success: req.flash('success'),
            errorMessage,
            oldInput,
            validationErrors: errors.array(),
        }
        renderPage(res, 'auth/register', data, 'Register', '/register')
    }
};



module.exports = { validateUserRequest, validateUserRegistration };