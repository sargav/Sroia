const mongoose = require('mongoose')

// הקטגוריות של התמונות באתר. השמות זהים לשמות התיקיות הישנות ב-public,
// כדי שהכתובת הציבורית /api/images/:folderName תמשיך לעבוד בלי שינוי
const IMAGE_CATEGORIES = ['start', 'finish', 'Testimonials']

// תמונה אחת באתר. הקובץ עצמו שמור ב-Cloudinary, וכאן רק הפרטים שלו
const imageSchema = new mongoose.Schema({
    // הכתובת המלאה של התמונה ב-Cloudinary
    url: {
        type: String,
        required: true
    },
    // המזהה של התמונה ב-Cloudinary - צריך אותו כדי למחוק אותה משם
    publicId: {
        type: String,
        required: true,
        unique: true
    },
    // לאיזה חלק באתר התמונה שייכת
    category: {
        type: String,
        enum: IMAGE_CATEGORIES,
        required: true
    },
    // סדר ההצגה בתוך הקטגוריה - מספר קטן מוצג קודם
    order: {
        type: Number,
        default: 0
    },
    // טקסט חלופי לנגישות (מה רואים בתמונה)
    alt: {
        type: String,
        trim: true,
        maxlength: 200,
        default: ''
    },
    // שם הקובץ המקורי - עוזר לזהות תמונות, ומונע העלאה כפולה בסקריפט ההעברה
    originalName: {
        type: String,
        trim: true
    }
}, { timestamps: true })

imageSchema.index({ category: 1, order: 1 })

module.exports = mongoose.model('Image', imageSchema)
module.exports.IMAGE_CATEGORIES = IMAGE_CATEGORIES
