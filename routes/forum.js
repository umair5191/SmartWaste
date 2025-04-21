// Creating a new router
const express = require("express");
const router = express.Router();

// Handling the routes for the forum page
router.get('/',function(req, res, next){
    res.render('forum.ejs');
})

// Exporting the router object so index.js can access it
module.exports = router;