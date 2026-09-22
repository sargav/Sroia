const express = require("express")
const router = express.Router()
const authController = require("../controllerManager/ManAuthController")
const verifyJWT = require("../../middlewar/verifyJWT")
router.post("/login", authController.login)
router.post("/register",verifyJWT, authController.register)
module.exports = router