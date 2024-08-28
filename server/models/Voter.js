const mongoose = require("mongoose");
const { Schema } = mongoose;

const Voter = new Schema({
  accountAddress: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});

const VoterModel = mongoose.model("voter", Voter);
module.exports = VoterModel;
