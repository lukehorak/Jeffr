"use strict";

const express = require('express');
const registerRoutes = express.Router();
const cookieSession = require('cookie-session');

registerRoutes.use(cookieSession({
  name: 'session',
  keys: ['keyX'],
  maxAge: 24 * 60 * 60 * 1000
}))

module.exports = function (DataHelpers) {
  // TODO - make widget, return json for it here?
  registerRoutes.get("/", function (req, res) {

  });

  registerRoutes.post("/", async function (req, res) {
    const {
      email,
      password,
      handle
    } = req.body;

    // async function to check if email is taken
    let emailIsTaken = await DataHelpers.propertyTakenBy("email", "users", email);
    let handleisTaken = await DataHelpers.propertyTakenBy("handle", "users", handle);

    // Input validation // TODO [Refactor] - Helper function? 
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
          req.session["user_id"] = response;
          res.sendStatus(200);
        }
      });
    }
  });

  return registerRoutes;

}