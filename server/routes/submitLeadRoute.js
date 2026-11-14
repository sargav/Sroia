const express = require("express");
const router = express.Router();
const controller = require("../controller/submitLeadController");

// טופס "המדריך לבונה": שמירת הנרשם ושליחה לרב מסר (פתוח לכולם, עם הגבלת קצב ב-server.js)
router.post("/", controller.submitLead);

module.exports = router;
