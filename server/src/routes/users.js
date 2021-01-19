const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {
  getUserByEmail,
  getCollectionsByUser,
  getProjectsByUser,
  getProjectsByCollection,
  getSongByProject,
  getStemsBySong,
  addUser,
  addProject,
  addCollection,
  addExistingProjectToCollection,
  login
} = require('../helpers/dbHelpers')

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



  // REGISTER ROUTE
  router.post("/", (req, res) => {
    const { first_name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 12);

    return addUser(first_name, email, hashedPassword, db)
    .then((data) => {
      const users = data.rows;
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });

  // LOGIN POST ROUTE
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
        res.status(401);
      });
  });

  router.get("/logout", (req, res) => {
    req.session = null;
    res.send(`logout route`);
  });

  return router;
};