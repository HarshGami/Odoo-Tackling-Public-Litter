const express = require("express");
const {
  register,
  login,
  verification,
} = require("../controllers/auth.controller");
const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/verification").post(verification);

module.exports = authRouter;
