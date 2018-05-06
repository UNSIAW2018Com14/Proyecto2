
const express = require('express');
const router = express.Router();
const passportFacebook = require('../controllers/auth');

router.get('/login/facebook', passportFacebook.authenticate('facebook'));
router.get('/auth/facebook/callback',
passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;