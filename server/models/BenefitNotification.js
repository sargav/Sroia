const mongoose = require('mongoose')

//תת סכמה עבור נמען אחד שיקבל מייל כשמגיעה פניה על ההטבה
const recipientSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'כתובת מייל לא תקינה']
    }
}, { _id: false })

//רשימת האנשים שיקבלו מייל כשמגיעה פניה מצור קשר של ההטבה
const benefitNotificationSchema = new mongoose.Schema({
    //ההטבה שאליה שייכת רשימת המיילים
    benefit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BenefitDefi',
        required: true,
        unique: true
    },
    //רשימת האנשים שיקבלו מייל
    recipients: {
        type: [recipientSchema],
        default: [],
        validate: {
            validator: list => new Set(list.map(r => r.email)).size === list.length,
            message: 'אותו מייל מופיע ברשימה יותר מפעם אחת'
        }
    },
    //האם לשלוח מיילים למנהלי החנות עבור ההטבה הזאת
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('BenefitNotification', benefitNotificationSchema)