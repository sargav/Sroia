// routes/paymentRoutes.js
const express = require('express')
const router = express.Router()
const { tryPay } = require('../controller/paymentController') // הנתיב לקובץ שבו tryPay נמצאת
const { cardcomNotify } = require('../controller/cardcomNotifyController')

router.post('/pay', tryPay) // נתיב ליצירת תשלום

// Cardcom מודיעים לשרת על כל עסקה בדפי אישורית זהב (Notify URL).
// ההודעה מגיעה כטופס (POST) או כ-JSON, ולכן מקבלים את שניהם
router.post('/cardcom-notify', express.urlencoded({ extended: false }), cardcomNotify)
// אותו דבר, כשמילת הקוד בתוך הכתובת עצמה ולא אחרי סימן שאלה:
// /api/payment/cardcom-notify/<מילת הקוד>  (למקרה ש-Cardcom לא שולחים לכתובת שיש בה ?)
router.post('/cardcom-notify/:key', express.urlencoded({ extended: false }), cardcomNotify)

module.exports = router
