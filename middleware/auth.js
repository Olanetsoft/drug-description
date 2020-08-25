/* eslint-disable consistent-return */
const checkNotLoggedIn = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};

const checkLoggedIn = (req, res, next) => {
    const { isLoggedIn } = req.session;

    if (req.session) {
        if (isLoggedIn) res.redirect('/');

        return next();
    }
};

module.exports = { checkLoggedIn, checkNotLoggedIn }