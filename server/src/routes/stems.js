// const express = require('express');
// const router = express.Router();
// const db = require("../../lib/db")
// const { getStems } = require('../helpers/dbHelpers')

// module.exports = (db) => {
    // router.get("/", (req, res) => {
    //   db.query(`SELECT * FROM stems;`)
    //     .then((data) => {
    //       const users = data.rows;
    //       res.json({ users });
    //     })
    //     .catch((err) => {
    //       res.status(500).json({ error: err.message });
    //     });
    // });
    // return router;
//   };

/* GET stem info from db */
// router.get('/', function(req, res, next) {
//      return res.status(200).json({ message: 'Welcome to Express API template' });
// });

// router.get('/', (req, res) => {
//     getStems()
//         .then((users) => res.json(users))
//         .catch((err) => res.json({
//             error: err.message
//         }));
// });

// module.exports = router;

// We will use project routes instead of stems routes

const express = require('express');
const router = express.Router();


module.exports = (db) => {
    /* GET users listing. */
    router.get("/", (req, res) => {
        db.query(`SELECT * FROM stems;`)
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