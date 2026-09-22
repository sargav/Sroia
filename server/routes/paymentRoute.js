// routes/paymentRoutes.js
const express = require('express')
const router = express.Router()
const { tryPay } = require('../controller/paymentController') // הנתיב לקובץ שבו tryPay נמצאת

router.post('/pay', tryPay) // נתיב ליצירת תשלום

module.exports = router