
const express = require('express');
const router = express.Router();
const passportFacebook = require('../controllers/auth');

router.get('/loginFB', passportFacebook.authenticate('facebook'));
router.get('/auth/facebook/callback',
passportFacebook.authenticate('facebook', { failureRedirect: '/loginfb' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  router.get('/logout/facebook', function(req, res) {
    req.logout();
    res.redirect('/');
  });

module.exports = router;