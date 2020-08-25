const mongoose = require('mongoose');
const dotenv = require('dotenv');


// Handling uncaught exceptions globally
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION 😶', err);
});

// using the dotenv variable
dotenv.config({ path: './config.env' });

const app = require('./app');


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected successfully🎉')
});


// console.log(process.env);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


// Handling unhandled rejection globally
process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
});
