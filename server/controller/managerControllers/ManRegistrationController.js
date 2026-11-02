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
                handled: p.handled,
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

// PATCH /api/manager/registrations/payments/:id  { handled: true/false }
// סימון "קיבל גישה" לרוכש
const setHandled = async (req, res) => {
    if (typeof req.body.handled !== 'boolean') {
        return res.status(400).json({ message: 'handled must be true or false' })
    }
    try {
        const payment = await Payment.findByIdAndUpdate(
            req.params.id,
            { handled: req.body.handled },
            { new: true }
        )
        if (!payment) return res.status(404).json({ message: 'Payment not found' })
        res.json({ _id: payment._id, handled: payment.handled })
    } catch (error) {
        // מזהה לא תקין
        res.status(400).json({ message: error.message })
    }
}

module.exports = { getRegistrations, setHandled }
