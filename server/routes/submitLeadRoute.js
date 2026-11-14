const express = require("express");
const router = express.Router();
const controller = require("../controller/submitLeadController");

router.post("/", controller.submitLead);

module.exports = router;
