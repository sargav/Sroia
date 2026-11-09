const express = require('express')
const router = express.Router()
const { addCheckoutLead } = require('../controller/checkoutLeadController')

router.post('/', addCheckoutLead)

module.exports = router
