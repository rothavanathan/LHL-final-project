const express = require("express");
const router = express.Router();
const {
  getCollectionsByUser,
  getProjectsByUser,
} = require("../helpers/dbHelpers");

module.exports = (db) => {

  // Fetch Collections & Project Data for Home View
  router.get("/", (req, res) => {
    const userID = req.session.userId;
    console.log(`userID is `, userID)
    if (!userID) {
      res.status(403).send(`lol fuck you`);
    } else {
      getCollectionsByUser(userID, db)
        .then((collectionsData) => {
          getProjectsByUser(userID, db)
          .then((projectsData) => {
            const collections = collectionsData.rows;
            const projects = projectsData.rows;
            res.json({ collections, projects });
          });
        })
        .catch((err) => console.log(err));
    }
  });

  return router;
};
