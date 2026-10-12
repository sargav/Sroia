// תשלום באשראי דרך Cardcom, כשהכל עובר דרך השרת:
//
// 1. createPayment  - הדפדפן שולח מוצר + פרטי לקוח. השרת קובע את המחיר, יוצר הזמנה ב-Mongo,
//                     מבקש מ-Cardcom דף תשלום חד-פעמי ומחזיר לדפדפן רק את הקישור.
// 2. paymentWebhook - Cardcom מודיעים לשרת שהתשלום הסתיים. לא סומכים על מה שהם שולחים:
//                     השרת שואל את Cardcom בעצמו (GetLpResult) ורק אז מסמן את ההזמנה כשולמה.
// 3. getPaymentStatus - דף התוצאה באתר יכול לשאול מה מצב ההזמנה.
//
// משתני סביבה (ב-Render, תחת Environment של השרת):
//   CARDCOM_TERMINAL  - מספר הטרמינל
//   CARDCOM_API_NAME  - שם המשתמש ל-API (API Name)
//   SITE_URL          - כתובת האתר, לשם Cardcom מחזירה את הלקוח. לדוגמה: https://sroia.onrender.com
//   SERVER_URL        - הכתובת הציבורית של השרת, לשם Cardcom שולחת את ה-Webhook. לדוגמה: https://server-sroia.onrender.com

const axios = require('axios')
const mongoose = require('mongoose')
const checking = require('../functionChecking/functionChecking')
const products = require('../config/products')
const Order = require('../models/Order')

const CARDCOM_API = 'https://secure.cardcom.solutions/api/v11/LowProfile'

const trimSlash = (url) => String(url || '').replace(/\/+$/, '')

const cardcomAuth = () => ({
    TerminalNumber: Number(process.env.CARDCOM_TERMINAL),
    ApiName: process.env.CARDCOM_API_NAME,
})

// ---------- 1. יצירת תשלום ----------
const createPayment = async (req, res) => {
    const { product: productKey, name, email, phone } = req.body || {}
    const product = products[productKey]

    if (!product) {
        return res.status(400).json({ message: 'Unknown product' })
    }
    if (!process.env.CARDCOM_TERMINAL || !process.env.CARDCOM_API_NAME || !process.env.SITE_URL || !process.env.SERVER_URL) {
        console.error('תשלום: חסרים משתני סביבה CARDCOM_TERMINAL / CARDCOM_API_NAME / SITE_URL / SERVER_URL')
        return res.status(500).json({ message: 'Payment is not configured' })
    }

    // בדיקות תקינות
    const errors = {}
    if (!name || !checking.isValidName(String(name).trim())) errors.name = 'Invalid name'
    if (!email || !checking.isValidEmail(String(email))) errors.email = 'Invalid email'
    if (product.requirePhone && (!phone || !checking.isValidPhone(String(phone)))) errors.phone = 'Invalid phone number'
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ message: 'Invalid input data', errors })
    }

    const cleanPhone = phone ? String(phone).replace(/\D/g, '') : undefined

    let order
    try {
        // ההזמנה נוצרת לפני התשלום, והמזהה שלה נשלח ל-Cardcom וחוזר אלינו ב-Webhook
        order = await Order.create({
            product: productKey,
            productName: product.name,
            amount: product.price,
            name: String(name).trim(),
            email: String(email).trim(),
            phone: cleanPhone,
        })

        const siteUrl = trimSlash(process.env.SITE_URL)
        const serverUrl = trimSlash(process.env.SERVER_URL)
        const resultUrl = (status) => `${siteUrl}${product.resultPath}?status=${status}&order=${order._id}`

        const { data } = await axios.post(`${CARDCOM_API}/Create`, {
            ...cardcomAuth(),
            Operation: 'ChargeOnly',
            ReturnValue: String(order._id),
            Amount: product.price,
            ProductName: product.name,
            Language: 'he',
            ISOCoinId: 1, // שקלים
            SuccessRedirectUrl: resultUrl('success'),
            FailedRedirectUrl: resultUrl('failed'),
            WebHookUrl: `${serverUrl}/api/payment/webhook`,
            // כמה תשלומים הלקוח יכול לבחור. לבדוק בטרמינל הבדיקות שזה מוצג כמו שצריך
            AdvancedDefinition: product.maxPayments > 1
                ? { MinNumOfPayments: 1, MaxNumOfPayments: product.maxPayments }
                : undefined,
            Document: {
                Name: order.name,
                Email: order.email,
                Phone: cleanPhone,
                Products: [{ Description: product.name, UnitCost: product.price, Quantity: 1 }],
            },
        }, { timeout: 15000 })

        // ResponseCode 0 = הדף נוצר (זה עוד לא אומר שהתשלום עבר)
        if (data?.ResponseCode !== 0 || !data?.Url) {
            console.error('Cardcom Create נכשל:', data?.ResponseCode, data?.Description)
            await Order.updateOne({ _id: order._id }, { status: 'failed', failReason: data?.Description })
            return res.status(502).json({ message: 'Error creating payment page' })
        }

        await Order.updateOne({ _id: order._id }, { lowProfileId: data.LowProfileId })

        // לדפדפן חוזר רק הקישור לדף התשלום ומזהה ההזמנה, בלי שום פרט רגיש
        return res.status(200).json({ paymentUrl: data.Url, orderId: order._id })
    } catch (error) {
        console.error('שגיאה ביצירת תשלום:', error?.response?.data || error.message)
        if (order) {
            await Order.updateOne({ _id: order._id }, { status: 'failed', failReason: 'server error' }).catch(() => {})
        }
        return res.status(500).json({ message: 'Server error while creating payment' })
    }
}

// ---------- 2. Webhook מ-Cardcom ----------
const paymentWebhook = async (req, res) => {
    const body = req.body || {}
    const lowProfileId = body.LowProfileId || body.lowProfileId || body.lowprofilecode || req.query.lowprofilecode

    if (!lowProfileId) {
        // מחזירים 200 כדי ש-Cardcom לא ינסו שוב בקשה שאין מה לעשות איתה
        console.warn('Webhook בלי LowProfileId')
        return res.sendStatus(200)
    }

    try {
        // לא סומכים על תוכן ה-Webhook: שואלים את Cardcom בעצמנו
        const { data } = await axios.post(`${CARDCOM_API}/GetLpResult`, {
            ...cardcomAuth(),
            LowProfileId: lowProfileId,
        }, { timeout: 15000 })

        const orderId = data?.ReturnValue
        if (!orderId || !mongoose.isValidObjectId(orderId)) {
            console.warn('Webhook: לא נמצא מזהה הזמנה בתשובה של Cardcom', lowProfileId)
            return res.sendStatus(200)
        }

        const order = await Order.findById(orderId)
        if (!order) {
            console.warn('Webhook: הזמנה לא קיימת', orderId)
            return res.sendStatus(200)
        }
        // Cardcom עלולים לשלוח את אותו Webhook כמה פעמים. הזמנה ששולמה לא מעדכנים שוב
        if (order.status === 'paid') {
            return res.sendStatus(200)
        }

        const tx = data?.TranzactionInfo || {}
        const approved = data?.ResponseCode === 0 && (tx.ResponseCode === undefined || tx.ResponseCode === 0)
        const amountOk = tx.Amount === undefined || Number(tx.Amount) === order.amount

        if (approved && amountOk) {
            order.status = 'paid'
            order.lowProfileId = lowProfileId
            order.tranzactionId = data?.TranzactionId ? String(data.TranzactionId) : tx.TranzactionId && String(tx.TranzactionId)
            order.numOfPayments = tx.NumberOfPayments
            order.paidAt = new Date()
            order.failReason = undefined
        } else {
            order.status = 'failed'
            order.failReason = !amountOk
                ? `amount mismatch: ${tx.Amount}`
                : (tx.Description || data?.Description || `code ${data?.ResponseCode}`)
        }
        await order.save()
        return res.sendStatus(200)
    } catch (error) {
        console.error('שגיאה ב-Webhook:', error?.response?.data || error.message)
        // 500 = Cardcom ינסו לשלוח שוב מאוחר יותר
        return res.sendStatus(500)
    }
}

// ---------- 3. מצב הזמנה (לדף התוצאה) ----------
const getPaymentStatus = async (req, res) => {
    const { orderId } = req.params
    if (!mongoose.isValidObjectId(orderId)) {
        return res.status(400).json({ message: 'Invalid order id' })
    }
    const order = await Order.findById(orderId, 'status product').lean()
    if (!order) return res.status(404).json({ message: 'Order not found' })
    return res.json({ status: order.status, product: order.product })
}

module.exports = { createPayment, paymentWebhook, getPaymentStatus }
