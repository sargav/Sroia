// routes/paymentRoute.js
const express = require('express')
const router = express.Router()
const { createPayment, paymentWebhook, getPaymentStatus } = require('../controller/paymentController')

// האתר מבקש דף תשלום: { product, name, email, phone }
router.post('/create', createPayment)

// Cardcom מודיעים שהתשלום הסתיים. יכול להגיע כ-JSON או כטופס, ולכן מקבלים את שניהם
router.post('/webhook', express.urlencoded({ extended: false }), paymentWebhook)

// דף התוצאה באתר שואל מה מצב ההזמנה
router.get('/status/:orderId', getPaymentStatus)

module.exports = router
