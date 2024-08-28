const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const candidatePostImageRoutes = require("./routes/postCandidateImage");
const vouterPostImageRoutes = require("./routes/postVoterImage");
const authenticationRoute = require("./routes/authenticationRoute");
const path = require("path");
const { authentication } = require("./middleware/authentication");
require("dotenv").config();

connectDB(process.env.MONGO_URL).then(() => console.log("Connected to DB"));
app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "votingSystems")));

app.use("/api", authenticationRoute);
app.use("/api", authentication, candidatePostImageRoutes);
app.use("/api", authentication, vouterPostImageRoutes);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
