const mongoose = require('mongoose')

// תשלום שהתקבל מדפי התשלום של Cardcom (אישורית זהב).
// נשמר רק אחרי שהשרת בדק מול Cardcom שהעסקה באמת קיימת ואושרה.
// לא שומרים כאן פרטי כרטיס ולא תעודת זהות.
const paymentSchema = new mongoose.Schema({
    // מספר העסקה אצל Cardcom. ייחודי, כדי שהודעה כפולה לא תיצור תשלום כפול
    internalDealNumber: { type: String, required: true, unique: true },

    productName: { type: String },       // למשל "המצפן לבונה- בית בשתי ידיים"
    productGroupId: { type: String },    // מזהה הדף/המוצר ב-Cardcom (ProdGroupID)
    amount: { type: Number },            // הסכום ששולם בפועל, בשקלים
    numberOfPayments: { type: Number },
    couponNumber: { type: String },

    name: { type: String },
    email: { type: String, lowercase: true },
    phone: { type: String },

    approvalNumber: { type: String },
    invoiceNumber: { type: String },
    dealDate: { type: Date },

    // האם הלקוח כבר קיבל את מה ששילם עליו (לשימוש עתידי בפאנל הניהול)
    handled: { type: Boolean, default: false }
}, {
    timestamps: true
})

module.exports = mongoose.model('Payment', paymentSchema)
