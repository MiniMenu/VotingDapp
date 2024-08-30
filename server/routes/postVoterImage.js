const express = require("express");
const router = express.Router();

const VoterModel = require("../models/Voter");
const multerConfig = require("../config/multerConfig");
router.post("/postVoterImage", multerConfig.uploadVoter, async (req, res) => {
  try {
    const { accountAddress } = req;
    const imageName = req.file.filename;
    await VoterModel.create({
      accountAddress,
      imageName,
    });
    res.status(201).json({ message: "Image Upload Sucessfull!" });
  } catch (error) {
    res.status(500).json({ message: "Image Upload Unsucessfull!" });
    console.error(error);
  }
});
module.exports = router;
