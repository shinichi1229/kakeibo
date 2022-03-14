const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');

/* GET users listing. */
router.get('/', authenticationEnsurer, function (req, res, next) {
  if (req.obj) {
    res.send(req.obj);
  }
  res.send('respond with a resource');
});

module.exports = router;
