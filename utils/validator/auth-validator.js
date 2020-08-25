const { body } = require('express-validator');

const validateSignup = [
    body('firstName', 'First Name cannot be empty').notEmpty(),
    body('lastName', 'Last Name cannot be empty').notEmpty(),
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage(
            'Password should contain a minimum of 8 characters',
        )
];

const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage(
            'Password should contain a minimum of 8 characters',
        )
];

module.exports = {
    validateSignup,
    validateLogin,
};
