const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
// const controller = require('../controller/managerControllers/ManTaskController')

// כל הנתיבים כאן למנהלים בלבד
router.use(verifyJWT)

// router.get('/', controller.getTasks)           // ?status=todo&manager=<id>
// router.post('/', controller.addTask)
// router.patch('/:id', controller.updateTask)
// router.delete('/:id', controller.deleteTask)

module.exports = router
