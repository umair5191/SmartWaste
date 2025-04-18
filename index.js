// Importing the modules
const express = require ('express');
const ejs = require('ejs');
const session = require ('express-session');
const validator = require('express-validator');
const expressSanitizer = require('express-sanitizer');
const mysql = require('mysql2');

// Creating the express application object
const app = express();
const port = 8000;

// Telling Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Setting up the body parser
app.use(express.urlencoded({ extended: true }));

// Setting up the express sanitizer
app.use(expressSanitizer());

// Setting up public folder (for css and statis js)
app.use(express.static('public'));

// Creating a session
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Setting up the database connection
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'smartWaste_app',
    password: 'smartWaste123',
    database: 'smartWaste'
});

// Connecting to the database
db.connect((err) => {
    if (err) {
        console.log('Error connecting to database', err);
    }
    else {
        console.log('Connected to the database');
    }
});
global.db = db; // Making the database accessible for all routes

// Loading the route handlers for landing page
const landingRoutes = require("./routes/landing");
app.use('/', landingRoutes);

// Loading the route handlers for logging in and out and registering users
const userRoutes = require("./routes/users");
app.use('/users', userRoutes);

// Loading the route handlers for leaderboard page
const leaderboardRoutes = require("./routes/leaderboard");
app.use('/leaderboard', leaderboardRoutes);

// Loading the route handlers for impact page
const impactRoutes = require("./routes/impact");
app.use('/impact', impactRoutes);