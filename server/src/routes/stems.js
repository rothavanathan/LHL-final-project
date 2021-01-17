const { getStems } = require('../helpers/dbHelpers')

// We will use project routes instead of stems routes
// Methods in helpers to be incorporated here too

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  /* GET all stems*/
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM stems;`)
      .then((data) => {
        const stems = data.rows;
        res.json({ stems });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
