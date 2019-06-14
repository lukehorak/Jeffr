"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const mongo = require('mongodb');
const bcrypt = require('bcrypt');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    ////////////////////////////////////////////////////////////////////////////
    // Manipulation Functions
    ////////////////////////////////////////////////////////////////////////////
    // builds Error Message
    errorMessageBuilder: function(email, password){
      let errorMessage = "Oops! We were unable to register you due to the following:";
      if (!email) {
        errorMessage += " No email was provided;";
      }
      if(!password) {
        errorMessage += " No password was provided;"
      }
      return errorMessage.trim();
    },
    // Returns Id if taken, undefined if not taken, so the result can be used as a conditional or getter
    propertyTakenBy: async function(propName, resource, property){
      const query = {[propName]: property};
      let result = await db.collection(resource).find(query, {"_id":1}).toArray();
      return (result[0] ? result[0]._id : undefined );
    },
    ////////////////////////////////////////////////////////////////////////////
    // Getters and Setters
    ////////////////////////////////////////////////////////////////////////////

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      console.log(`Inserting new tweet:\n${newTweet.content.text}`);
      try{
        db.collection("tweets").insertOne(newTweet);
        callback(null);
      }
      catch (e){
        callback(e)
      }
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      console.log("Getting Tweets...");
      db.collection("tweets").find().toArray(callback);
    },

    // Get all users
    getAllUsers: function(callback) {
      console.log(`Getting users`);
      db.collection("users").find({}, {password: 0}).toArray(callback);
    },

    // Get user by Id
    getUser: function(user, callback) {
      console.log(`Getting user ${user}`);
      try{
        const objectID = new mongo.ObjectID(user)
        db.collection("users").find({"_id": objectID}).toArray(callback);
        //callback(null, db.collection("users").findOne({"_id": objectID}, {password: 0}));
      }
      catch(e){
        callback(e)
      }
    },

    newUser: function(body, callback){
      const {first_name, last_name, handle, email, password} = body;
      const newUser ={
        name: `${first_name} ${last_name}`,
        handle: handle,
        avatars: {
          small: "/images/DrJeffMalcom.jpg",
          regular: "/images/DrJeffMalcom.jpg",
          large: "/images/DrJeffMalcom.jpg"
          },
        email: email,
        password: bcrypt.hashSync(password, 10)
      }
      try{
        db.collection("users").insert(newUser, function (err, docInserted){
          callback(err, docInserted.ops[0]._id);
        });
      }
      catch (e){
        callback(e)
      }

    }

  };
}
