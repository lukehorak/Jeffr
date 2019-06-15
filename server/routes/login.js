"use strict";

const express = require('express');
const loginRoutes = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

loginRoutes.use(cookieSession({
  name: 'session',
  keys: ['keyX'],
  maxAge: 24 * 60 * 60 * 1000
}))

module.exports = function (DataHelpers) {
  loginRoutes.get("/", function (req, res) {
    res.json({form: "login", buttonText: "Log In", buttonClass: "submit-login"});
  });

  loginRoutes.post("/", async function (req, res) {
    const {
      email,
      password,
      handle
    } = req.body;

    // Input validation // TODO [Refactor] - Helper function? 
    if (!email || !password) {
      const errorMessage = DataHelpers.errorMessageBuilder(email, password);
      res.status(400).json({
        err: errorMessage
      });
    } else {
      // async function to get email/handle 
      let user_id = await DataHelpers.propertyTakenBy("email", "users", email);
      DataHelpers.getUser(user_id, (err, user) => {
        if (err) {
          console.log(`Cannot find user with id ${req.params.id}`);
          res.status(500).json({
            error: err.message
          });
        } else {
          if (bcrypt.compareSync(password, user[0].password)) {
            req.session["user_id"] = user_id;
            res.redirect('/');
          } else {
            res.status(401).json({
              error: "Wrong Email or Password!"
            });
          }

        }
      })
    }
  });

  return loginRoutes;

}