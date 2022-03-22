const express = require('express');
const router = express.Router();
const passport = require('passport');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'login',
    user: req.user
  });
});

router.post('/', passport.authenticate('local',
  {
    successRedirect: '/users',
    failureRedirect: '/login',
    session: true,
  }));

module.exports = router;
