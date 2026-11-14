const express = require('express')
const router = express.Router()
const controller = require('../controller/siteStatsController')
const verifyJWT = require('../middleware/verifyJWT')

router.patch('/',verifyJWT, controller.updateStats)

module.exports = router
