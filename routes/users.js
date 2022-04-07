const express = require('express');
const router = express.Router();
const Receipt = require('../models/receipt');
const User = require('../models/user');
const moment = require('moment-timezone');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/images' })


const authenticationEnsurer = require('./authentication-ensurer');

/* GET users listing. */
router.get('/', authenticationEnsurer, function (req, res, next) {
  Receipt.findAll({
    include: [
      {
        model: User,
        attributes: ['userid', 'email']
      }
    ],
    where: {
      createdby: req.user.userid
    },
  }).then((receipts) => {
    // console.log(receipts[0].user.userid);
    // receipts.forEach(a => {
    //   console.log(a.receiptid);
    //   console.log(a.amount);
    // });
    receipts.forEach(s => {
      s.formattedPostingdate = moment(s.postingdate)
        .tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm');
      console.log(s.img);
    });
    // res.send(receipts);
    res.render('users', {
      title: req.user.email,
      receipts: receipts
    });
  });


});
router.post('/', authenticationEnsurer,
  upload.single('img'),
  function (req, res, next) {
    let imgFileName = "";
    if (req.file) {
      imgFileName = req.file.filename;
    }
    const updatedAt = new Date();
    Receipt.create({
      createdby: req.user.userid,
      amount: req.body.amount,
      shopid: req.body.shopId,
      postingdate: req.body.postingDate,
      memo: req.body.memo,
      imgfilepath: imgFileName
    }).then((a) => {
      console.log(a);
      res.send("test ok");
    });

    // console.log(req.user.userid);
    // console.log(req.body.amount);
    // console.log(req.body.shopId);
    // console.log(req.body.postingDate);
    // console.log(req.body.memo);
    // console.log(req.img);
    console.log(req.file)
  });
router.get('/new', authenticationEnsurer, function (req, res, next) {
  res.render('new', {
    user: req.user,
  });
});

module.exports = router;
