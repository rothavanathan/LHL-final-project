const express = require("express");
const router = express.Router();
const { getSongByProject } = require("../helpers/dbHelpers");

module.exports = (db) => {
  /* GET song for project*/
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    getSongByProject(id, db)
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
