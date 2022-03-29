const express = require('express');
const router = express.Router();
const Receipt = require('../models/receipt');
const User = require('../models/user');

const authenticationEnsurer = require('./authentication-ensurer');

/* GET users listing. */
router.get('/', authenticationEnsurer, function (req, res, next) {
  Receipt.findOne({
    include: [
      {
        model: User,
        attributes: ['userid', 'email']
      }
    ],
    where: {
      userid: req.params.userid
    },
  }).then((receipts) => {

  })

  res.render('users', {
    title: req.user.userid,
  });
});
router.post('/', authenticationEnsurer, function (req, res, next) {
  const updatedAt = new Date();

  Receipt.create({
    createdby: req.user.userid,
    amount: req.body.amount,
    shopid: req.body.shopId,
    postingdate: req.body.postingDate,
    memo: req.body.memo,
    img: req.body.img
  }).then((a) => {
    console.log(a);
    res.send("test ok");
  });

  console.log(req.user.userid);
  console.log(req.body.amount);
  console.log(req.body.shopId);
  console.log(req.body.postingDate);
  console.log(req.body.memo);
});
router.get('/new', authenticationEnsurer, function (req, res, next) {
  res.render('new', {
    user: req.user,
  });
});

module.exports = router;
