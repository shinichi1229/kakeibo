const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const Receipt = require('../models/receipt');

const authenticationEnsurer = require('./authentication-ensurer');

/* GET users listing. */
router.get('/', authenticationEnsurer, function (req, res, next) {
  res.render('users', {
    title: req.user.userid,
  });
});
router.post('/', authenticationEnsurer, function (req, res, next) {
  const updatedAt = new Date();

  // Receipt.create({
  //   createdby: req.user.userid,
  //   amount: req.body.amount,
  //   shopid: req.body.amount,
  //   postingdate: req.body.postingDate,
  // })






  if (req.obj) {
    res.send(req.obj);
  }
  res.send(scheduleId);
});
router.get('/new', authenticationEnsurer, function (req, res, next) {
  res.render('new', {
    user: req.user,
  });
});

module.exports = router;
