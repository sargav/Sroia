const mongoose = require('mongoose')
//כל אחד שנרשם לקבלת המדריך
const guideSignupSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    //בדיקה שרב מסר באמת קיבלו את הפניה 
    sentToMailer: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('GuideSignup', guideSignupSchema)
