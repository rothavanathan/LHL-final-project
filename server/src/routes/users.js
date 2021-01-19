const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { addUser, login } = require("../helpers/dbHelpers");

module.exports = (db) => {

  // Register Route
  router.post("/", (req, res) => {
    const { first_name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 12);

    return addUser(first_name, email, hashedPassword, db)
      .then((userInfo) => {
        if (!userInfo) {
          res.sendStatus(404);
        } else {
          const user = userInfo.rows[0];
          req.session.userId = user.id;
          const userEmail = user.email;
          res.send({ userEmail });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Login Route
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    return login(email, password, db)
      .then((userInfo) => {
        if (!userInfo) {
          res.status(404).json({ error: err.message });
        } else {
          const user = userInfo[0];
          console.log(user)
          req.session.userId = user.id;
          const userEmail = user.email;
          res.send({ userEmail });
        }
      })
      .catch((err) => {
        res.status(401).json({ error: err.message });
      });
  });

  // Logout Route
  router.get("/logout", (req, res) => {
    req.session = null;
    res.send(`logout route`);
  });

  return router;
};