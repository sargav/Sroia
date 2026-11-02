const express = require('express')
const router = express.Router()
const controller = require('../controller/siteStatsController')
const verifyJWT = require('../middleware/verifyJWT')

// עדכון המספרים - למנהלים בלבד
router.use(verifyJWT)
router.patch('/', controller.updateStats)

module.exports = router
