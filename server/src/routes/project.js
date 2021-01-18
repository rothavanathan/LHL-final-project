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
  return router;
};
