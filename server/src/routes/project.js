const express = require("express");
const router = express.Router();
const { getSongByProject, addNoteToProject, addProject } = require("../helpers/dbHelpers");

module.exports = (db) => {

  // Fetch Song Data for Project View
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

  // Update PROJECT with new note and ID
  router.put("/addnote", (req, res) => {
    const { notes, id, collection_id } = req.body;

    addNoteToProject(notes, collection_id, id, db)
      .then((data) => {
        console.log(`insert completed!`, data);
        res.json(data)
      })
      .catch((err) => {
        console.log(`ruh roh`, err);
        res.status(500).json({ error: err.message });
      });
  });

  // ADD Project
  // title, song_id, user_id
  router.put("/new", (req, res) => {
    const { title, song_id, user_id } = req.body;
    console.log(`req.body in new project route is `, req.body)
    addProject(title, song_id, user_id, db)
      .then((data) => {
        console.log(`return from new project route is:`, data.rows)
        const projectId = data.rows[0].id

        res.send({ projectId });
      })
      .catch((err) => {
        console.log(`ruh roh`, err);
        res.status(500).json({ error: err.message });
      });
  });

  return router;


};
