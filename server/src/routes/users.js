const express = require('express');
const router = express.Router();

/* GET user info from db */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST user info from db */
router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
