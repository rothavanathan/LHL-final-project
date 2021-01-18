const express = require("express");
const router = express.Router();



  module.exports = (db) => {
  /* GET all collections by user*/
  router.get("/", (req, res) => {
    const query = `
      SELECT * FROM collections
      WHERE user_id = $1;
    `;

    const query2 = `
      SELECT * FROM projects
      WHERE user_id = $1;
    `;

    if (!req.session.userId){
      res.status(403).send(`lol fuck you`)
    } else {
      return db.query(query, [req.session.userId])
        .then(result1 => {
          db.query(query2, [req.session.userId])
            .then(result2 => {
              const collections = result1.rows
              const projects = result2.rows
              console.log(`result 1 was`, result1.rows)
              console.log(`result 2 was`, result2.rows)
              res.json( {collections, projects})
            })
        })
        .catch(err => console.log(err));



    }

  })
  return router;
};
