const express = require('express');

const { checkLoggedIn } = require('../middleware/auth');

const {
    logout,
    getUserRegister,
    postUserRegister,
    getUserLogin,
    postUserLogin,
} = require('../controllers/auth');
const { validateLogin, validateSignup } = require('../utils/validator/auth-validator');


const router = express.Router();

router.get('/register', checkLoggedIn, getUserRegister);
router.post('/register', checkLoggedIn, validateSignup, postUserRegister);
router.get('/login', checkLoggedIn, getUserLogin);
router.post('/login', checkLoggedIn, validateLogin, postUserLogin);
router.get('/logout', logout);
module.exports = router;