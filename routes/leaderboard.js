// Creating a new router
const express = require("express");
const router = express.Router();

// Handling route for leaderboard page
router.get('/', function (req, res, next) {
    let sqlquery = "SELECT score FROM users where username = ?"; // Query to get the user's score
    db.query(sqlquery, [req.session.userId], (err, result) => {
        if (err) {
            next(err);
        }
        const currentScore = result[0].score; // Getting user's current score
        
        // Query to get top 10 highest scoring users
        let sqlquery2 = "SELECT username, score FROM users ORDER BY score DESC LIMIT 10";
        db.query(sqlquery2, (err, result) => {
            if (err) {
                next(err);
            }
            const topTen = result; // Getting the top 10 users
            res.render('leaderboard.ejs', {topTen, currentScore}); // Rendering the leaderboard page
        })
    })
})