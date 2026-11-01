const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')
// const controller = require('../controller/managerControllers/ManEventController')

// כל הנתיבים כאן למנהלים בלבד
router.use(verifyJWT)

// router.get('/', controller.getEvents)          // ?from=...&to=...
// router.get('/:id', controller.getEventById)
// router.post('/', controller.addEvent)
// router.patch('/:id', controller.updateEvent)
// router.delete('/:id', controller.deleteEvent)

module.exports = router
