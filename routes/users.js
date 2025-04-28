// Creating router for users to login/logout and register
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); // Importing bcrypt to securely store passwords by hashing them
const saltRounds = 10;
const { check, validationResult } = require('express-validator'); // Importing express-validator to check if inputs are valid

// Handling route to login
router.post('/loggedin', function (req, res, next) {
    let sqlquery = "SELECT hashedPassword FROM users where username = ?";
    db.query(sqlquery, [req.sanitize(req.body.username)], (err, result) => { // Sanitizing the username to prevent harmful attacks
        if (err){
            next(err); // Passing to error handler
        }
        if (result.length == 0) {
            return res.render('index.ejs', { error: "Invalid username or password. Please try again." }); // If username is not found, user is informed and prompted to try again
        }
        let hashedPassword = result[0].hashedPassword;
        // Comparing the password supplied with the password in the database
        bcrypt.compare(req.sanitize(req.body.password), hashedPassword, function(err, result) { // Sanitizing the password to prevent harmful attacks
            if (result == true) {
                // Saving user session here when login is successful
                req.session.userId = req.sanitize(req.body.username);
                res.render('home.ejs', {username: req.sanitize(req.body.username)}); // If password is correct, user is welcomed to the home page
            }
            else {
                res.render('index.ejs', { error: "Invalid username or password. Please try again." }); // If password is incorrect, user is informed and prompted to try again
            }
        })
    })
})

// Handling route to register an account
// The following checks ensure that email, username and password are valid
router.post('/registered', [check('email').isEmail().withMessage('Invalid email.'), 
    check('password').isLength({ min: 10 }).withMessage('Invalid password, must be at least 10 characters.'), 
    check('username').notEmpty().withMessage('Username must not be empty')], function (req, res, next) {
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {
        res.render('register.ejs', {errors: errors.array() });  // If there are errors, user is informed and prompted to try again
    }
    else {
        const plainPassword = req.sanitize(req.body.password); // Sanitizing the password to prevent harmful attacks
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) { // Hashing the password
            let sqlquery = "INSERT INTO users (username, email, hashedPassword) VALUES (?, ?, ?)";
            
            // Sanitizing the inputs to prevent harmful attacks
            let email = req.sanitize(req.body.email);   
            let username = req.sanitize(req.body.username);

            // Excecuting SQL query
            db.query(sqlquery, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    next(err);
                }
                // Saving user session here, when registration is successful
                req.session.userId = req.sanitize(req.body.username);
                res.render('home.ejs', {username}); // If successful, user is welcomed to the home page
            })                                                                           
        })
    }
})

// Handling route to display logout page
router.get('/logout', function (req, res, next) {
    res.render('logout.ejs', {username: req.session.userId}); // Informing user that they have logged out                                                       
})

// Handling route to confirm logout
router.post('/loggedout', function (req, res, next) {
    req.session.destroy(); // Destroying the session
    res.render('index.ejs', { error: null }); // Redirecting user to the login page
})

module.exports = router;