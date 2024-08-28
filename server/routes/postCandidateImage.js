const express = require("express");
const router = express.Router();

const CandidateModel = require("../models/Candidate");
const multerConfig = require("../config/multerConfig");
router.post(
  "/postCandidateImage",
  multerConfig.uploadCandidate,
  async (req, res) => {
    try {
      const { accountAddress } = req;
      const imageName = req.file.filename;
      const savedcandidate = await CandidateModel.create({
        accountAddress,
        imageName,
      });
      res.status(201).json(savedcandidate);
    } catch (error) {
      console.error(error);
    }
  }
);
module.exports = router;
