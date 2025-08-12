const mongoose = require("mongoose");

async function connectToDB(){
  await mongoose.connect(process.env.DB_URL);
  console.log("DB connected");
}

module.exports = connectToDB;