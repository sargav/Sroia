const mongoose = require('mongoose')

// מי שהשאיר פרטים כדי לקבל את "המדריך לבונה".
// המדריך עצמו נשלח במייל דרך רב מסר - כאן רק שומרים, כדי שהמנהל יראה בפאנל
const guideSignupSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    // האם רב מסר קיבלו את הפרטים (ושלחו את המדריך)
    sentToMailer: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('GuideSignup', guideSignupSchema)
