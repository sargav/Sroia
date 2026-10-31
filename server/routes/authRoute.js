const express = require('express')
const router = express.Router()
const authController = require('../controller/managerControllers/authController')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/login', authController.login)     
router.get('/refresh', authController.refresh)  
router.post('/logout', authController.logout)

router.post('/register', verifyJWT, authController.register)

module.exports = router