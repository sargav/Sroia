const Payment = require('../../models/Payment')
const GuideSignup = require('../../models/GuideSignup')
require('../../models/CheckoutLead') // נדרש בשביל populate
const productOf = require('../../utils/paymentProduct')

// GET /api/manager/registrations
// כל ההרשמות ביחד: רכישות (קורס ומצפן) ונרשמים למדריך, מהחדש לישן
const getRegistrations = async (req, res) => {
    try {
        const [payments, guides] = await Promise.all([
            Payment.find().populate('checkoutLead', 'name email phone marketingConsent').sort({ createdAt: -1 }).lean(),
            GuideSignup.find().sort({ createdAt: -1 }).lean(),
        ])
        const list = [
            ...payments.map((p) => ({
                _id: p._id,
                kind: 'payment',
                product: productOf(p),
                productName: p.productName,
                // הפרטים שהלקוח כתב בטופס, ואם אין - מה שחזר מ-Cardcom
                name: p.checkoutLead?.name || p.name,
                email: p.checkoutLead?.email || p.email,
                phone: p.checkoutLead?.phone || p.phone,
                marketingConsent: p.checkoutLead?.marketingConsent,
                linkStatus: p.linkStatus,
                amount: p.amount,
                numberOfPayments: p.numberOfPayments,
                date: p.dealDate || p.createdAt,
            })),
            ...guides.map((g) => ({
                _id: g._id,
                kind: 'guide',
                product: 'guide',
                name: g.name,
                email: g.email,
                phone: g.phone,
                amount: 0,
                sentToMailer: g.sentToMailer,
                date: g.createdAt,
            })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date))
        res.json(list)
    } catch (error) {
        console.error('שגיאה בקריאת ההרשמות:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { getRegistrations }
