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

    // ADD NOTE TO PROJECT BY ID
    router.put("/addnote", (req, res) => {
      const { notes, id } = req.body;

      addNoteToProject(notes, id, db)
      return db
        .then((data) => {
          console.log(`insert completed!`, data);
        })
        .catch((err) => {
          console.log(`ruh roh`, err);
          res.status(500).json({ error: err.message });
        });
    });

    // ADD Project
    router.put("/new", (req, res) => {
      const { title } = req.body;
      const id = req.session.userId;

      addProject(title, id, db)
      return db
        .then((data) => {
          console.log(`insert completed!`, data);
          res.send({ id });
        })
        .catch((err) => {
          console.log(`ruh roh`, err);
          res.status(500).json({ error: err.message });
        });
    });

  return router;


};
