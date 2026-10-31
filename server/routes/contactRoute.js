const express = require('express')
const router = express.Router()
const controller = require('../controller/contactController')

router.post('/',controller.addContact)

module.exports = router