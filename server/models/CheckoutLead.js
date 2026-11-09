const mongoose = require('mongoose')

// מי שמילא את טופס הקורס או המצפן ולחץ על המשך לתשלום.
// נשמר לפני שהתשלום נפתח, עם הפרטים כפי שהלקוח כתב אותם.
// כשמגיע אישור מ-Cardcom, השורה מסומנת "שילם" ומקושרת לתשלום.
const checkoutLeadSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 200 },
    // ספרות בלבד. בטופס המצפן אין טלפון, ולכן השדה לא חובה
    phone: { type: String, trim: true, maxlength: 20 },
    product: { type: String, required: true, enum: ['course', 'compass'] },

    // האם הלקוח סימן הסכמה לקבל תכנים שיווקיים, ומתי
    marketingConsent: { type: Boolean, default: false },
    consentAt: { type: Date },

    status: { type: String, enum: ['started', 'paid'], default: 'started' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
}, {
    timestamps: true
})

checkoutLeadSchema.index({ email: 1, product: 1, status: 1 })
checkoutLeadSchema.index({ phone: 1, product: 1, status: 1 })

module.exports = mongoose.model('CheckoutLead', checkoutLeadSchema)
