const express = require("express");
const router = express.Router();
const { addCollection, getProjectsByCollection } = require("../helpers/dbHelpers");

module.exports = (db) => {

  // grab projects associated with this collection
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    getProjectsByCollection(id, db)
      .then((data) => {
        console.log(`projects from collection id ${id} are`, data)
        const projects = data
        console.log("PROJECCCC------", projects)
        res.json({ projects });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  // ADD Collection
  // name, thumbnail, userId
  router.put("/", (req, res) => {
    const randomImages = ["https://images.unsplash.com/photo-1582730147924-d92f4da00252?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2851&q=80", "https://images.unsplash.com/photo-1526394931762-90052e97b376?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dmlueWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8dmlueWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", "https://images.unsplash.com/photo-1492284163710-4eef97892705?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8dmlueWx8ZW58MHx8MHw%3D&auto=format&fit=crop&w=900&q=60", "https://images.unsplash.com/photo-1489068461847-2fe69e5a5555?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzF8fHZpbnlsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60", "https://images.unsplash.com/photo-1489068353139-3740c7af5fb4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8ODN8fHZpbnlsfGVufDB8fDB8&auto=format&fit=crop&w=900&q=60", "https://images.unsplash.com/photo-1552843779-fb34bed6ad77?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1834&q=80"];

    const thumbnail = randomImages[Math.floor(Math.random() * randomImages.length)];
    const { name, user_id } = req.body;

    addCollection(name, thumbnail, user_id, db)
      .then((data) => {
        console.log(`after collections put request`, data)
        const collectionId = data.id
        const thumbnail = data.thumbnail

        res.send({ data });
      })
      .catch((err) => {
        console.log(`ruh roh`, err);
        res.status(500).json({ error: err.message });
      });
  });

  return router;


};
