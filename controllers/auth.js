/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const { renderPage } = require('../utils/render-page');
const User = require('../models/user');
const { validateUserRequest, validateUserRegistration } = require('../utils/request-body-validator');
const { userCheck, userCreate } = require('../utils/user-check');
const { errorUserLogin, errorUserRegister } = require('../utils/response');


// Post User Registration
const postUserRegister = async (req, res) => {

    // Get user input from request body
    const { firstName, lastName, email, password } = req.body;
    const userDetails = {
        firstName,
        lastName,
        email,
    };

    // Validate registration
    validateUserRegistration(req, res, userDetails);

    // validate user email
    userCheck(email).then(async (user) => {

        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            try {
                const saveUser = await userCreate({ ...userDetails, password: hashedPassword });
                if (saveUser) {
                    req.flash('success', 'Registration Successful');
                    req.session.user = saveUser;
                    req.session.createdAt = Date.now();
                    req.session.isLoggedIn = true;
                    // console.log(user);
                    return res.redirect('/');
                }
            } catch (error) {
                console.log(error);
                return errorUserRegister(req, res, userDetails, 'Error Occurred')
            }
        }
        return errorUserRegister(req, res, userDetails, 'User already exists, Please Login');
    });
};


// Post User Login
const postUserLogin = async (req, res, next) => {
    const { email, password } = req.body;

    // Validate the User input
    validateUserRequest(req, res, email, password);

    await userCheck(email)
        .then(async (user) => {
            // console.log(user);
            if (!user) {
                return errorUserLogin(req, res, email, password, 'Invalid email or password.',);
            };
            if (user.active === 'false') {
                return errorUserLogin(req, res, email, password, 'Account suspended, contact Admin',);
            };

            // Validate User password with existing password in the DB
            bcrypt.compare(password, user.password)
                .then((valid) => {
                    if (valid) {
                        req.session.user = user;
                        req.session.createdAt = Date.now();
                        req.session.isLoggedIn = true;

                        return res.redirect('/');
                    }
                    return errorUserLogin(req, res, email, password, 'Invalid email or password.',);
                })
                .catch(() => {
                    console.log('invalid user')
                    res.redirect('/login');
            });
        })
        .catch(err => {
            console.log(err)
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

// Get User Registration
const getUserRegister = (req, res) => {
    const success = req.flash('success');
    let message = req.flash('error');
    if (message.length > 0) {
        [message] = message;
    } else {
        message = null;
    }
    const data = {
        pageName: 'User Registration',
        success,
        errorMessage: message,
        oldInput: {
            email: '',
            password: '',
        },
        path: 'signup',
        validationErrors: [],
    };
    renderPage(res, 'auth/register', data, 'Register', '/register');
};

// Get User login
const getUserLogin = (req, res) => {
    const success = req.flash('success');
    let message = req.flash('error');
    if (message.length > 0) {
        [message] = message;
    } else {
        message = null;
    }
    const data = {
        pageName: 'User Login',
        success,
        errorMessage: message,
        oldInput: {
            email: '',
            password: '',
        },
        path: 'signin',
        validationErrors: [],
    };
    renderPage(res, 'auth/login', data, 'login', '/login');

};

// Logout User
const logout = (req, res) => {
    if (req.session.isLoggedIn) {
        req.session = null;
    };
    res.redirect('/');
};

module.exports = {
    getUserRegister,
    getUserLogin,
    postUserRegister,
    postUserLogin,
    logout
}