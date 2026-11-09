const { rateLimit } = require('express-rate-limit')

// הגנה מספאם על הטפסים הציבוריים: עד 10 שליחות בדקה מאותה כתובת IP.
// חל רק על שליחה (POST), ולא על קריאת נתונים
const formRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method !== 'POST',
    message: { message: 'Too many requests, please try again in a minute' },
})

module.exports = formRateLimit
