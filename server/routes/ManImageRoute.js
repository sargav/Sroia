const express = require('express')
const router = express.Router()
const controller = require('../controller/managerControllers/ManImageController')
const verifyJWT = require('../middleware/verifyJWT')
const uploadImages = require('../middleware/uploadImages')

router.use(verifyJWT)

router.get('/', controller.getAll)                       
router.post('/', uploadImages, controller.uploadImages)    
router.patch('/:id', controller.updateImage)      
router.delete('/:id', controller.deleteImage)              

module.exports = router