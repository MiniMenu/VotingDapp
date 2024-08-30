const express = require("express");
const router = express.Router();
const ethers = require("ethers");
const jwt = require("jsonwebtoken");

router.post("/authentication", async (req, res, next) => {
  try {
    const { accountAddress } = req.query;
    const { signature } = req.body;
    const electionCommision = "0x958bd4906017ACfC1538C24662983025239A160d";
    if (!accountAddress || !signature) {
      return res.status(500).json({ message: "Authentication Failed!" });
    }
    const authenticationMessage =
      "You accept the terms and conditions for voting dapp";
    const recoverAddress = ethers.utils.verifyMessage(
      authenticationMessage,
      signature
    );
    if (recoverAddress.toLowerCase() === accountAddress.toLowerCase()) {
      const token = jwt.sign({ accountAddress }, "secretkey");

      const electionCommisionStatus =
        recoverAddress.toLowerCase() === electionCommision.toLowerCase()
          ? true
          : false;

      return res.status(200).json({
        message: "Authentication Sucessfull!",
        token: token,
        electionCommisionStatus: electionCommisionStatus,
      });
    }
    return res.status(500).json({ message: "Authentication Failed!" });
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
