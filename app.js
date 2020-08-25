const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cookieSession = require('cookie-session');
const flash = require("connect-flash");
const csrf = require('csurf');



// requiring the cookie parser
const cookieParser = require('cookie-parser');

// Require all routes
const auth = require('./routes/auth');
const indexRouter = require('./routes');




const app = express();

const csrfProtection = csrf();

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        name: 'session',
        keys: [process.env.SESSION_COOKIEKEY],
    }),
);
// Cookie Parser
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: false,
    })
);


// Middleware registered
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));


// setting the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set flash response for feedback
app.use(flash());


// registering a middleware for server static files
app.use(express.static(path.join(__dirname, 'public')));




// Global Middleware registered
// Using morgan only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};


app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(compression());

// Protecting the application against cyber attack

app.use(csrfProtection);
app.use((req, res, next) => {
    const token = req.csrfToken();
    res.cookie('csrf-token', token);
    res.locals.csrfToken = req.csrfToken();
    res.locals.currentUser = req.session.user;
    next();
});


// ************ REGISTER ROUTES HERE ********** //

app.use(auth);
app.use(indexRouter);


// ************ END ROUTE REGISTRATION ********** //

module.exports = app;