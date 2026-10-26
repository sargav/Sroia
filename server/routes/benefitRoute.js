const express = require('express')
const router = express.Router()
const benefitController = require('../controller/benefitController')

router.post('/', benefitController.addBenefit)

module.exports = router
