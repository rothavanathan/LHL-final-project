// Methods in helpers to be incorporated here too

// addUser, getby email, get by collection

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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

  router.post("/", (req, res) => {
    const query = `INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3) RETURNING *`;

    const { first_name, email, password } = req.body;

    console.log(first_name, email, password);
    const hashedPassword = bcrypt.hashSync(password, 12);
    console.log("HASHED: ", hashedPassword);

    return db
      .query(query, [first_name, email, hashedPassword])
      .then((data) => {
        console.log(`insert completed!`, data);
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        console.log(`ruh roh`, err);
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
