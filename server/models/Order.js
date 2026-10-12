const mongoose = require('mongoose')

// הזמנה אחת = ניסיון תשלום אחד.
// נוצרת לפני שהלקוח מגיע לדף התשלום (status: pending),
// ומתעדכנת ל-paid רק אחרי שהשרת בדק מול Cardcom שהתשלום באמת עבר.
const orderSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        enum: ['course', 'mazpen']
    },
    productName: { type: String, required: true },
    amount: { type: Number, required: true }, // הסכום שנקבע בשרת, בשקלים

    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },

    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },

    // מזהה דף התשלום אצל Cardcom. לפיו בודקים את התוצאה
    lowProfileId: { type: String, index: true },
    // פרטים מהעסקה עצמה, אחרי שהתשלום עבר
    tranzactionId: { type: String },
    numOfPayments: { type: Number },
    paidAt: { type: Date },
    // תיאור השגיאה מ-Cardcom, אם התשלום נכשל
    failReason: { type: String }
}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)
