const express = require('express')
const router = express.Router()
const controller = require('../controller/managerControllers/ManTaskController')
const verifyJWT = require('../middleware/verifyJWT')

// כל הנתיבים כאן למנהלים בלבד
router.use(verifyJWT)

router.get('/', controller.getTasks)           // ?scope=all&status=todo
router.post('/', controller.addTask)
router.patch('/:id', controller.updateTask)
router.delete('/:id', controller.deleteTask)

module.exports = router
