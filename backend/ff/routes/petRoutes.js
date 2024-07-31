const express = require("express");
const router = express.Router();
const { getPets, getPet , updatePet} = require("../controllers/petControl.js");

router.get("/", getPets);
router.get("/:id", getPet);
router.put("/", updatePet);

module.exports = router;
