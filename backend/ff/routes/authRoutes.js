const express = require("express");
const { login, signup, logout } = require("../controllers/authController.js");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

function test(req, res) {
  console.log("req.session:", req.session);
  console.log("req.body:", req.body);
}

module.exports = router;
