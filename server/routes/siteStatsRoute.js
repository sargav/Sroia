const express = require('express')
const router = express.Router()
const controller = require('../controller/siteStatsController')

// פתוח לכולם - האתר מציג את המספרים
router.get('/', controller.getStats)

module.exports = router
