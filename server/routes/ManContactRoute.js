const express = require('express')
const router = express.Router()
const controller = require('../controller/managerControllers/MancontactController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.get('/', controller.getAll)            
router.get('/:id', controller.getById)       
router.patch('/:id', controller.updateContact) 
router.delete('/:id', controller.deleteContact)

module.exports = router