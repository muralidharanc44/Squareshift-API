const mongoose = require("mongoose");
const username = "admin";
const password = "bRxQYQBBMfOsO3V3";
const cluster = "cluster0.uf4bt43";
const dbname = "squareDB";
module.exports = async function (url) {
  try {
    await mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("Connected to task DB");
  } catch (error) {
    console.error("Something went wrong", error);
  }
};