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
            next(err);
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
