const path = require('path');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const cookieSession = require('cookie-session');
const flash = require("connect-flash");
const csrf = require('csurf');
const cron = require('node-cron');



// requiring the cookie parser
const cookieParser = require('cookie-parser');

// Require all routes
const auth = require('./routes/auth');
const indexRouter = require('./routes');
const Prescription = require('./models/prescription');
const sendEmail = require('./utils/send-email');




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

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// error handler
app.use((error, req, res, next) => {
    if (error.status === 404) {
        console.log(error.status);
        res.status(404).render('pages/error404');
    }
    else {
        console.log(error);
        res.status(500).render('pages/error500');
    }
});

// Reminder every 6hrs
cron.schedule('* */6 * * *', async () => {
    console.log('running every 6 hrs');

    // Find all prescription in the system
    const findAll = await Prescription.find().populate('creator');
    findAll.forEach(p => {
        if (p.creator.email === p.userEmail && p.verify !== 'true') {
            const message = `Hello there ! <br> <br> This is a Reminder message to take your <b> ${p.drugName}</b> drug as prescribe by Doctor / physician`;

            sendEmail({
                email: p.creator.email,
                subject: 'REMINDER',
                message,
            });
        }
    });
});



module.exports = app;