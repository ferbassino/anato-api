const express = require("express");
const dbconnect = require("./config");
const app = express();
const studentRouter = require("./routes/studentRoutes");
const userRouter = require("./routes/userRoutes");
const router = express.Router();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

router.get("/", (req, res) => {
  res.send("welcome to backend zone");
});

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(studentRouter);
app.use(userRouter);

const PORT = process.env.PORT || 3002;

app.listen(3001, () => {
  console.log(`Listening on port ${PORT}`);
});
