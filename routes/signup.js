const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();
const uuid = require('uuid');
const User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('signup', {
    title: "ユーザー登録",
  });
});

router.post('/', function (req, res, next) {
  const userId = uuid.v4();
  User.create({
    userid: userId,
    email: req.body.email,
    password: req.body.password
  }).then(() => {
    res.render('login', {
      comment: "登録しました。下記よりログインしてください。"
    });
  })
});

module.exports = router;
