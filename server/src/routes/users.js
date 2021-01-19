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

  const getUserWithEmail = (email, database) => {
    return database
      .query(
        `
      SELECT users.* FROM users
      WHERE users.email = $1
      `,
        [email]
      )
      .then((res) => {
        return res.rows.length > 0
          ? Promise.resolve(res.rows)
          : Promise.reject(`no user with that email`);
      });
  };

  const login = (email, passwordInput, database) => {
    return getUserWithEmail(email, database).then((rows) => {
      if (bcrypt.compareSync(passwordInput, rows[0].password)) {
        return Promise.resolve(rows);
      } else {
        return Promise.reject(null);
      }
    });
  };

  // REGISTER ROUTE
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
        req.session.userId = users[0].id;
        res.json({ users });
      })
      .catch((err) => {
        console.log(`ruh roh`, err);
        res.status(500).json({ error: err.message });
      });
  });

  //LOGIN POST ROUTE
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    return login(email, password, db)
      .then((userInfo) => {
        if (!userInfo) {
          res.sendStatus(404);
        }
        req.session.userId = userInfo[0].id;
        const userEmail = userInfo[0].email;
        res.send({ userEmail });
      })
      .catch((err) => {
        res.sendStatus(401);
      });
  });

  router.get("/logout", (req, res) => {
    req.session = null;
    res.send(`logout route`);
  });

  return router;
};
