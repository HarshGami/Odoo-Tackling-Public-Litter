const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth.route");
const connectDB = require("./configs/db.config");

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", authRouter);

app.listen("5000", () => {
  console.log("server starting");
});
