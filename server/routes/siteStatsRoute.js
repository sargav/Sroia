const express = require('express')
const router = express.Router()
const controller = require('../controller/siteStatsController')

router.get('/', controller.getStats)

module.exports = router
