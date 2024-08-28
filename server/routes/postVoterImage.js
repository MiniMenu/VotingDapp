const express = require("express");
const router = express.Router();

const VoterModel = require("../models/Voter");
const multerConfig = require("../config/multerConfig");
router.post("/postVoterImage", multerConfig.uploadVoter, async (req, res) => {
  try {
    const { accountAddress } = req;
    const imageName = req.file.filename;
    const savedvoter = await VoterModel.create({
      accountAddress,
      imageName,
    });
    console.log(savedvoter);
    res.status(201).json(savedvoter);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
