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
    // מי עדכן אחרון
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model('SiteStats', siteStatsSchema)
