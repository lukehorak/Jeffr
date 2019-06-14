"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

// Mongo
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/jeffr";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log(`Error when connecting to ${MONGODB_URI}:`);
    throw err;
  }

  console.log(`Connected to MongoDB: ${MONGODB_URI}`);

  // Require tweetsRoutes, which itself needs DataHelpers
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const userRoutes = require("./routes/users")(DataHelpers);
  const registerRoutes = require("./routes/register")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);
  app.use("/users", userRoutes);
  app.use("/register", registerRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});