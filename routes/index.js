var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'レシート保管庫',
    user: req.user
  });
});


module.exports = router;
