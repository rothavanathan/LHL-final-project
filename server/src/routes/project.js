// We will use project routes instead of stems routes
// Methods in helpers to be incorporated here too

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  /* GET all stems*/
  router.get("/:id", (req, res) => {

    db.query(`SELECT projects.*, songs.*, stems.*
    FROM projects
    JOIN songs ON projects.id = songs.project_id
    JOIN stems ON songs.id = stems.song_id
    WHERE projects.id = ${req.params.id};`)
      .then((data) => {
        const projects = data.rows;
        res.json({ projects });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

    // ADD NOTE TO PROJECT BY ID
    router.put("/addnote", (req, res) => {
      const query = `
        UPDATE projects
        SET notes = $1
        WHERE id = $2;
      `;

      const { notes, id } = req.body;

      console.log(notes, id);

      return db
        .query(query, [notes, id])
        .then((data) => {
          console.log(`insert completed!`, data);
          // const users = data.rows;
          // req.session.userId = users[0].id;
          // res.json({ users });
          console.log("DATA----", data)
          console.log("ROWS-----", data.rows);
        })
        .catch((err) => {
          console.log(`ruh roh`, err);
          res.status(500).json({ error: err.message });
        });
    });

  return router;


};
