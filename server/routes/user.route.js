const express = require("express");
const {
  get_collector_list
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.route("/get_collector_list").get(get_collector_list);

module.exports = userRouter;
