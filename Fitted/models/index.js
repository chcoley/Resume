const mongoose = require("mongoose");

const Fit = require("./fit");
const User = require("./user");
const Closet = require("./closet");

mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true });

module.exports = {
  User,
  Closet,
  Fit,
  db: {
    registerNewUser
  }
};


/**
* creates a new user and returns the document with their data from the database
* @param username of the user
* @param email of the user
*/
async function createUser({ username, email }) {
 return await User.create({ username, email });
}

/**
* creates a closet for a new user.  expects an owner object from Mongo
* @param owner object from the database
* @returns a new object with the user and their closet
*/
async function createCloset({ owner }) {
 // make a new empty closet that's connected to its owner
 const closet = await Closet.create({ owner });

 // connect the user object with the new closet
 const user = await User.findById(owner._id);
 user.closet = closet;
 await user.save();

 // return the closet
 return closet;
}

/**
* register a new user and create an empty closet for them
* @param name of the new user
* @param email of the new user
* @returns object with user and closet properties
*/
async function registerNewUser({ name, email }) {
 const owner = await createUser({ username: name, email });
 const closet = await createCloset({ owner });
 return { user, closet }
}