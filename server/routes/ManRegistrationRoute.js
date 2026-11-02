const express = require('express')
const router = express.Router()
const controller = require('../controller/managerControllers/ManRegistrationController')
const verifyJWT = require('../middleware/verifyJWT')

// הרשמות ורכישות - למנהלים בלבד
router.use(verifyJWT)

router.get('/', controller.getRegistrations)
router.patch('/payments/:id', controller.setHandled)

module.exports = router
