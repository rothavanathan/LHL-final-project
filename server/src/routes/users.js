// Methods in helpers to be incorporated here too

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  /* GET all users*/
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
