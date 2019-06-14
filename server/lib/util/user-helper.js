"use strict";

const Chance = require("chance");
const chance = new Chance();

const md5 = require('md5');

module.exports = {

  generateRandomUser: () => {
    const gender    = chance.gender();
    const lastName  = chance.last();
    const userName  = "Jeff " + lastName;

    let userHandle = "@Jeff";


    const suffix = Math.round(Math.random() * 1000);
    userHandle += suffix;

    const jeffNumber = Math.round(Math.random() * 6 + 1);
    const avatarUrl = `/images/RandomJeffs/Jeff${jeffNumber}.png`;
    const avatars = {
      small:   avatarUrl,
      regular: avatarUrl,
      large:   avatarUrl
    }

    return {
      name: userName,
      handle: userHandle,
      avatars: avatars
    };
  }
};
