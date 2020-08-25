module.exports.errorUserLogin = (
    req,
    res,
    email,
    password,
    errorMessage,
) =>
    res.render('auth/login', {
        pageName: 'User Login',
        path: '/login',
        errorMessage,
        success: req.flash('success'),
        oldInput: {
            email,
            password,
        },
        validationErrors: [],
    });

module.exports.errorUserRegister = (req, res, oldInput, errorMessage) => {
    return res.render('auth/register', {
        pageName: "User Registration",
        path: '/register',
        errorMessage,
        success: req.flash('success'),
        oldInput,
    })
};


