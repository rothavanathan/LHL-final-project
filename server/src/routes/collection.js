const express = require("express");
const router = express.Router();
const { addCollection } = require("../helpers/dbHelpers");

module.exports = (db) => {

  // ADD Project
  // name, thumbnail, userId
  router.put("/new", (req, res) => {
    const { name, thumbnail, user_id } = req.body;

    addCollection(name, thumbnail, user_id, db)
      .then((data) => {
        const collectionId = data.id
        res.send({ collectionId });
      })
      .catch((err) => {
        console.log(`ruh roh`, err);
        res.status(500).json({ error: err.message });
      });
  });

  return router;


};
