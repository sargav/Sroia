const mongoose = require('mongoose')

// המספרים שמופיעים באתר ושהמנהל מעדכן מהפאנל.
// יש רק מסמך אחד כזה במסד הנתונים.
const siteStatsSchema = new mongoose.Schema({
    // "100+ פרויקטים שליווינו"
    projectsCount: {
        type: Number,
        default: 100,
        min: 0,
        max: 100000
    },
    // "₪120K חיסכון ממוצע ללקוח" - נשמר בשקלים (120000)
    avgSavings: {
        type: Number,
        default: 120000,
        min: 0,
        max: 100000000
    },
    // ===== מחירים (רק מה שמוצג באתר. הסכום שנגבה בפועל מוגדר ב-Cardcom) =====
    // קורס "בית בשתי ידיים"
    coursePrice: { type: Number, default: 1987, min: 0, max: 1000000 },
    // בכמה תשלומים אפשר לשלם (התשלום החודשי מחושב באתר)
    courseInstallments: { type: Number, default: 10, min: 1, max: 36 },
    // "בחודש הבא המחיר עולה ל-..."
    coursePriceNext: { type: Number, default: 2700, min: 0, max: 1000000 },
    // אפליקציית "המצפן לבונה"
    compassPrice: { type: Number, default: 297, min: 0, max: 1000000 },
    // מי עדכן אחרון
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('SiteStats', siteStatsSchema)
