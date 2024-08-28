const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(500).json({ error: "Authentication Failed!!" });
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.accountAddress = decoded.accountAddress;
    next();
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = { authentication };
