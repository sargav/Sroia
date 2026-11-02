const Payment = require('../../models/Payment')
const GuideSignup = require('../../models/GuideSignup')

// לאיזה מוצר שייך תשלום, לפי השם שמגיע מ-Cardcom.
// שם המצפן ב-Cardcom הוא למשל "המצפן לבונה- בית בשתי ידיים", לכן בודקים קודם "מצפן"
const productOf = (payment) => {
    const name = payment.productName || ''
    if (name.includes('מצפן')) return 'compass'
    return 'course'
}

// GET /api/manager/registrations
// כל ההרשמות ביחד: רכישות (קורס ומצפן) ונרשמים למדריך, מהחדש לישן
const getRegistrations = async (req, res) => {
    try {
        const [payments, guides] = await Promise.all([
            Payment.find().sort({ createdAt: -1 }).lean(),
            GuideSignup.find().sort({ createdAt: -1 }).lean(),
        ])
        const list = [
            ...payments.map((p) => ({
                _id: p._id,
                kind: 'payment',
                product: productOf(p),
                productName: p.productName,
                name: p.name,
                email: p.email,
                phone: p.phone,
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
