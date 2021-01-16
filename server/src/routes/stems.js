const express = require('express');
const router = express.Router();

/* GET stem info from db */
router.get('/', function(req, res, next) {
    return res.status(200).json({ message: 'Welcome to Express API template' });
});

module.exports = router;
