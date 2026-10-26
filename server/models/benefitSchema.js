const mongoose = require('mongoose');

// שלבי הבנייה האפשריים - מוגדרים במקום אחד ומשמשים גם את הסכמות וגם את הבדיקות בקונטרולר
const BUILD_LEVELS = ["תכנון ורישוי", "ביצוע שלד", "ביצוע גמרים", "לקראת אכלוס"];

// סכמה של הטבה אחת.
// משמשת בשני מקומות:
// 1. BenefitDefi - קטלוג ההטבות הקיימות (כל מסמך = הטבה אחת)
// 2. CustomerBenefit - ההטבות שלקוח מסוים בחר (מערך בתוך מסמך הלקוח)
const benefitSchema = new mongoose.Schema({
    nameCompany: {
        type: String,
        required: true
    },
    IDBenefit: {
        type: String,
        required: true
    },
    levelOfBuilder: {
        type: String,
        required: true,
        enum: BUILD_LEVELS
    }
}, { timestamps: true });

module.exports = { benefitSchema, BUILD_LEVELS };
