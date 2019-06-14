"use strict";

const express       = require('express');
const userRoutes  = express.Router();

module.exports = function(DataHelpers) {

  userRoutes.get("/", function(req, res) {
    DataHelpers.getAllUsers((err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(users);
      }
    });
  });

  userRoutes.get("/:id", function(req, res) {
    DataHelpers.getUser(req.params.id, (err, user) => {
      if (err) {
        console.log(`Cannot find user with id ${req.params.id}`);
        res.status(500).json({ error: err.message });
      } else {
        res.json(user);
      }
    })
  });

  return userRoutes;

}