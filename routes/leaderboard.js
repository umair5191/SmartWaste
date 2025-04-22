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

// Handling route to update user's score
router.post('/update', function (req, res, next) {

    // Awarding certain points for each type of waste
    const awards = {
        plastic: 10,
        paper: 5,
        glass: 15,
        metal: 20,
        eWaste: 25
    };

    const addition = awards[req.body.item] * req.body.quantity; // Calculating how many points to award
    let sqlquery = "SELECT score FROM users where username = ?";
    db.query(sqlquery, [req.session.userId], (err, result) => {
        if (err) {
            next(err);
        }
        let updatedScore = result[0].score + addition; // Calculating the new score
        sqlquery = "UPDATE users SET score = ? WHERE username = ?";
        db.query(sqlquery, [updatedScore, req.session.userId], (err, result) => {
            if (err) {
                next(err);
            }
            res.redirect('/leaderboard') // Refreshing the leaderboard page to show the updated score
        })
    })
})

// Exporting the router object so index.js can access it
module.exports = router;