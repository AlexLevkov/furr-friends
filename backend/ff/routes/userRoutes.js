const express = require("express");
const router = express.Router();
const { getUsers , getUser } = require("../controllers/userControl");

router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;
