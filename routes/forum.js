// Creating a new router
const express = require("express");
const router = express.Router();

// Handling route to display forum page
router.get('/', (req, res) => {
  db.query('SELECT * FROM posts ORDER BY date DESC', (err, results) => {
    if (err) {
      next(err);
    }
    res.render('forum.ejs', { posts: results });
  });
});

// Adding new post
router.post('/post', (req, res) => {
  const content = req.body.content;
  const username = req.session.userId; 
  const date = new Date();

  // Inserting new post into the database
  db.query('INSERT INTO posts (username, content, date) VALUES (?, ?, ?)', [username, content, date], (err, result) => {
      if (err) {
        next (err);
      }
      res.redirect('/forum'); // Refresh to show new post
    }
  );
});

module.exports = router;
