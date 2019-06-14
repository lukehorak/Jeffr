"use strict";

const express = require('express');
const registerRoutes = express.Router();
const bcrypt = require('bcrypt');

module.exports = function (DataHelpers) {

  registerRoutes.get("/", function (req, res) {
    DataHelpers.registerWidget((err, users) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.json(users);
      }
    });
  });

  registerRoutes.post("/", async function (req, res) {
    const {
      email,
      password,
      handle
    } = req.body;

    // async function to check if email is taken
    let emailIsTaken = await DataHelpers.propertyTakenBy("email", "users", email);
    let handleIsTaken = await DataHelpers.propertyTakenBy("handle", "users", handle);

    if (!email || !password) {
      const errorMessage = DataHelpers.errorMessageBuilder(email, password);
      res.status(400).json({
        err: errorMessage
      });
    } else if (emailIsTaken) {
      const errorMessage = "That email is taken!";
      res.status(400).json({
        err: errorMessage
      });
    } else if (handleIsTaken) {
      const errorMessage = "That handle is taken!";
      res.status(400).json({
        err: errorMessage
      });
    } else {
      DataHelpers.newUser(req.body, (err, response) => {
        if (err) {
          console.log('Failed to register user!');
          res.status(500).json({
            error: err.message
          });
        } else {
          res.json(response);
        }
      });
    }
  });

  return registerRoutes;

}