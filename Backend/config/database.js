const mongoose = require("mongoose");

const ConnectToDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.CLOUD_URI, {});
    console.log("Connected To MongoDB");
  } catch (err) {
    console.log("Failed connecting to MongoDB");
    process.exit();
  }
};

module.exports = ConnectToDB;
