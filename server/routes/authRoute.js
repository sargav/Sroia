const express = require('express')
const router = express.Router()
const controller = require('../controller/managerControllers/authController')
const verifyJWT = require('../middleware/verifyJWT')

router.post('/login', controller.login)     
router.get('/refresh', controller.refresh)  
router.post('/logout', controller.logout)

router.post('/register', verifyJWT, controller.register)
router.delete('/:id', verifyJWT,controller.deleteManager)
router.get('/', verifyJWT,controller.getAllManagers)

module.exports = router