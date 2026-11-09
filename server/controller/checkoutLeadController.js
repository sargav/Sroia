const CheckoutLead = require('../models/CheckoutLead')
const checking = require('../functionChecking/functionChecking')
const { normalizePhone } = require('../utils/linkCheckoutLead')

const PRODUCTS = ['course', 'compass']

// POST /api/checkout-leads
// נקרא מטופס הקורס ומטופס המצפן, רגע לפני שנפתח התשלום
const addCheckoutLead = async (req, res) => {
    try {
        const { name, email, phone, product, marketingConsent } = req.body || {}

        // רק מחרוזות, כי המייל והטלפון משמשים לחיפוש במסד
        const hasPhone = typeof phone === 'string' && phone.trim() !== ''
        if (typeof name !== 'string' || typeof email !== 'string' || !PRODUCTS.includes(product)) {
            return res.status(400).json({ message: 'Invalid input data' })
        }
        if (phone !== undefined && typeof phone !== 'string') {
            return res.status(400).json({ message: 'Invalid input data' })
        }

        const cleanName = name.trim()
        const cleanEmail = email.trim().toLowerCase()
        if (!checking.isValidName(cleanName) || !checking.isValidEmail(cleanEmail)) {
            return res.status(400).json({ message: 'Invalid input data' })
        }
        // בקורס הטלפון חובה. במצפן אין שדה טלפון בטופס
        if ((product === 'course' && !hasPhone) || (hasPhone && !checking.isValidPhone(phone))) {
            return res.status(400).json({ message: 'Invalid phone number' })
        }

        const consent = marketingConsent === true
        const fields = {
            name: cleanName,
            marketingConsent: consent,
            consentAt: consent ? new Date() : null,
        }
        if (hasPhone) fields.phone = normalizePhone(phone)

        // מי שפתח את התשלום כמה פעמים - מעדכנים את אותה שורה ולא יוצרים כפילות
        await CheckoutLead.findOneAndUpdate(
            { email: cleanEmail, product, status: 'started' },
            { $set: fields },
            { upsert: true, sort: { updatedAt: -1 }, runValidators: true, setDefaultsOnInsert: true }
        )

        return res.status(201).json({ message: 'Saved' })
    } catch (error) {
        console.error('שגיאה בשמירת פרטי טופס לפני תשלום:', error.message)
        return res.status(500).json({ message: 'An error occurred' })
    }
}

module.exports = { addCheckoutLead }
