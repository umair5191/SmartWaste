// Creating a new router
const express = require("express");
const router = express.Router();

// Handling the routes for the locator page
router.get('/',function(req, res, next){
    res.render('locator.ejs');
})

// Exporting the router object so index.js can access it
module.exports = router;