const express = require('express')
const router = express.Router()
const benefitController = require('../controller/benefitController')

router.get('/catalog', benefitController.getCatalog) // רשימת ההטבות הקיימות
router.post('/', benefitController.addBenefit)       // שמירת לקוח וההטבות שבחר

module.exports = router
