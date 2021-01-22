const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { addUser, login, getUserByEmail } = require("../helpers/dbHelpers");

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
          req.session["user_id"] = user.id;
          console.log("COOOOKIEEEE----------",  req.session["user_id"])
          const userId = user.id;
          const userEmail = user.email;
          res.send({ userId });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // Login Route
  router.post("/login", (req, res) => {
    const { email, password } = req.body;

    getUserByEmail(email, db)
      .then((userInfo) => {
        if (userInfo.rows.length === 0) {
          console.log("NO USER FOUND")
          console.log("THIS BE DA DB RES---------->", userInfo.rows)
          res.send("ERROR")
          // above will handle sending back error
        } else {
          const user = userInfo.rows[0];
          console.log("THIS BE DA USER---------------->", user)
          req.session.userId = user.id;
          const userId = user.id;
          const userEmail = user.email;
          res.send({ userId });
        }
      })
      .catch((err) => {
        if (err){
          res.status(401).json({ error: err.message });
        } 
      });
  });

  // Logout Route
  router.get("/logout", (req, res) => {
    req.session = null;
    res.send(`logout route`);
  });

  return router;
};
