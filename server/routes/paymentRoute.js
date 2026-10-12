// routes/paymentRoutes.js
const express = require('express')
const router = express.Router()
const { tryPay } = require('../controller/paymentController') // הנתיב לקובץ שבו tryPay נמצאת
const { cardcomNotify } = require('../controller/cardcomNotifyController')

router.post('/pay', tryPay) // נתיב ליצירת תשלום

// Cardcom מודיעים לשרת על כל עסקה בדפי אישורית זהב (Notify URL).
// ההודעה מגיעה כטופס (POST) או כ-JSON, ולכן מקבלים את שניהם
router.post('/cardcom-notify', express.urlencoded({ extended: false }), cardcomNotify)

module.exports = router
