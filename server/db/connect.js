const mongoose = require("mongoose");
const connectDB = async (url) => {
  try {
    let connect = await mongoose.connect(url);
    return connect;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
