const express = require('express')
const router = express.Router()
const controller = require('../controller/managerControllers/ManBenefitNotificationController.js')
const requireAdminKey = require('../middleware/requireAdminKey')

// כל הנתיבים כאן לניהול בלבד
router.use(requireAdminKey)

router.get('/', controller.getAllNotifications)
router.get('/:id', controller.getOneNotification)
router.post('/', controller.addNotification)
router.put('/', controller.updateNotification)
router.delete('/:id', controller.deleteNotification)

router.post('/:id/recipients', controller.addRecipient)             // הוספת מייל אחד
router.delete('/:id/recipients/:email', controller.removeRecipient) // הסרת מייל אחד

module.exports = router
