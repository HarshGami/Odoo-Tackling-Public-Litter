const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.register = async (req, res) => {
  try {
    const user = await usermodel.findOne({
      email: req.body.email,
    });

    if (user) {
      res.json({ status: "error", message: "email is used before" });
      return;
    }

    const hash = bcrypt.hashSync(req.body.password, 12);

    await usermodel.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    });

    const token = jwt.sign(
      {
        email: req.body.email,
      },
      process.env.SECRET_KEY
    );

    res.json({
      status: "ok",
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      token,
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await usermodel.findOne({
      email: req.body.email,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            email: req.body.email,
          },
          process.env.SECRET_KEY
        );

        res.json({
          status: "ok",
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        });
      } else {
        res.json({ status: "error", message: "password is invalid" });
      }
    } else res.json({ status: "error", message: "user is not found" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

exports.verification = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token)
      return res
        .status(401)
        .json({ status: "error", message: "No token provided" });

    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ status: "error", message: "Invalid token" });

      res.json({ status: "ok", decoded });
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
