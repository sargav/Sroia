const SiteStats = require('../models/SiteStats')

// השדות שהמנהל יכול לעדכן
const FIELDS = ['projectsCount', 'avgSavings', 'coursePrice', 'courseInstallments', 'coursePriceNext', 'compassPrice']

// מה שהאתר מקבל: רק השדות האלה ותאריך העדכון
const toJSON = (stats) => {
    const data = { updatedAt: stats.updatedAt }
    FIELDS.forEach((f) => { data[f] = stats[f] })
    return data
}

// מחזיר את המסמך היחיד. אם עוד לא קיים - יוצר אותו עם ברירות המחדל
const getOrCreate = async () => {
    const stats = await SiteStats.findOne()
    return stats || SiteStats.create({})
}

// GET /api/site-stats - פתוח לכולם, האתר קורא מכאן
const getStats = async (req, res) => {
    try {
        const stats = await getOrCreate()
        res.json(toJSON(stats))
    } catch (error) {
        console.error('שגיאה בקריאת נתוני האתר:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// מספר שלם ולא שלילי, או undefined אם לא נשלח
const wholeNumber = (value) => {
    if (value === undefined) return undefined
    const n = Number(value)
    return Number.isInteger(n) && n >= 0 ? n : null
}

// PATCH /api/manager/site-stats - רק למנהלים
const updateStats = async (req, res) => {
    const changes = {}
    for (const f of FIELDS) {
        const n = wholeNumber(req.body[f])
        if (n === null) return res.status(400).json({ message: 'Numbers must be whole and not negative' })
        if (n !== undefined) changes[f] = n
    }
    try {
        const stats = await getOrCreate()
        Object.assign(stats, changes)
        stats.updatedBy = req.manager._id
        await stats.save() // ה-min/max במודל נבדקים כאן
        res.json(toJSON(stats))
    } catch (error) {
        console.error('שגיאה בעדכון נתוני האתר:', error.message)
        res.status(400).json({ message: error.message })
    }
}

module.exports = { getStats, updateStats }
