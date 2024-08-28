const mongoose = require("mongoose");
const { Schema } = mongoose;

const Candidate = new Schema({
  accountAddress: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
});

const CandidateModel = mongoose.model("candidate", Candidate);
module.exports = CandidateModel;
