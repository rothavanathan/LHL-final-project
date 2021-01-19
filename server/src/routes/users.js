const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { addUser, login } = require("../helpers/dbHelpers");

module.exports = (db) => {

  // REGISTER ROUTE
  router.post("/", (req, res) => {
    const { first_name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 12);

    return addUser(first_name, email, hashedPassword, db)
      .then((userInfo) => {
        if (!userInfo) {
          res.sendStatus(404);
        } else {
          const user = userInfo.rows[0];
          //  cookie must be set here
          req.session.userId = user.id;
          const userEmail = user.email;
          res.send({ userEmail });
        }
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

  router.get("/logout", (req, res) => {
    req.session = null;
    res.send(`logout route`);
  });

  return router;
};