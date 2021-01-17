// Methods in helpers to be incorporated here too

// addUser, getby email, get by collection

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

//   router.get("/:id", (req, res) => {

//     const query = {
//         text: `SELECT * FROM users WHERE email = $1` ,
//         values: [email]
//     }

//     db.query(query)
//       .then((data) => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });

  return router;
};
