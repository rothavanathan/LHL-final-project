const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { addUser, getUserByEmail } = require("../helpers/dbHelpers");

module.exports = (db) => {
  // Register Route
  router.post("/", (req, res) => {
    const { first_name, email, password } = req.body;
    // console.log("NEW USER EMAIL--------------->", email);
    const hashedPassword = bcrypt.hashSync(password, 12);

    getUserByEmail(email, db)
      .then((userInfo) => {
        console.log("USER----->", userInfo.rows[0]);
        if (!email || !password || !first_name) {
          // console.log("MISSING VALUE");
          const valError = "you're missing a field";
          res.send(valError);
        } else if (userInfo.rows.length !== 0) {
          // console.log("user exists");
          const userError = "that email is taken";
          res.send(userError);
        } else {
          addUser(first_name, email, hashedPassword, db).then((newUser) => {
            const user = newUser.rows[0];
            req.session["user_id"] = user.id;
            // console.log("COOOOKIEEEE----------", req.session["user_id"]);
            const userId = user.id;
            // console.log(
            //   "Registered as User: ----->",
            //   user.first_name,
            //   user.password,
            //   user.email,
            //   user.id
            // );
            res.send({ userId });
          });
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
          // console.log("NO USER FOUND");
          // console.log("THIS BE DA DB RES---------->", userInfo.rows);
          const emailError = "that email doesn't exist";
          res.send(emailError);
        } else if (!bcrypt.compareSync(password, userInfo.rows[0].password)) {
          // console.log("PASSWORD-----", password);
          // console.log("DB_PASSWORD-----", userInfo.rows[0].password);
          const passError = "that password is incorrect";
          // console.log("WRONG PASSWORD");
          res.send(passError);
        } else {
          const user = userInfo.rows[0];
          // console.log("THIS BE DA USER---------------->", user);
          req.session.userId = user.id;
          const userId = user.id;
          res.send({ userId });
        }
      })
      .catch((err) => {
        if (err) {
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
