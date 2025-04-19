// Creating a new router
const express = require("express");
const router = express.Router();

// Handling the routes for the landing/login page
router.get('/',function(req, res, next){
    res.render('index.ejs', { error: null });
})

// Handling route to register an account
router.get('/register', function (req, res, next) {
    res.render('register.ejs', { errors: [] });                                                               
})

// Exporting the router object so index.js can access it
module.exports = router;