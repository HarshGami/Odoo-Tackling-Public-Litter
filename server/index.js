const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth.route");
const connectDB = require("./configs/db.config");
const reportRouter = require("./routes/report.route");
const userRouter = require("./routes/user.route");

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/report", reportRouter)
app.use("/api/user", userRouter)

app.listen("5000", () => {
  console.log("server starting");
});
