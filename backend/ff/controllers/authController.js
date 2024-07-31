const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { username, password, fullname } = req.body;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.create({ username, password: hash, fullname });
    if (user) {
      req.session.user = user;
      res.json(user);
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log("err:", err);
  }
};

const login = async (req, res) => {
  try {
    const { password, _id } = req.body;
    const user = await User.findById(_id);
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      delete user.password;
      console.log("req.session:", req.session);
      req.session.user = user;
      console.log("req.session.user:", req.session.user);
      res.json(user);
    } else {
      res.status(401).json({ msg: "Invalid password" });
    }
  } catch (err) {
    console.log("err:", err);
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie("connect.sid", {
      path: "/",
      domain: ".alexlevkov.com",
      secure: true,
      sameSite: "none",
    });
    // req.session.user = null;
    res.send({ msg: "Logged out successfully" });
  } catch (err) {
    console.log("err:", err);
  }
};

const isAuthenticated = (req, res, next) => {
  console.log("req.session.user:", req.session.user);
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { signup, login, logout, isAuthenticated };
