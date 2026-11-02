const SiteStats = require('../models/SiteStats')

// מחזיר את המסמך היחיד. אם עוד לא קיים - יוצר אותו עם ברירות המחדל
const getOrCreate = async () => {
    const stats = await SiteStats.findOne()
    return stats || SiteStats.create({})
}

// GET /api/site-stats - פתוח לכולם, האתר קורא מכאן
const getStats = async (req, res) => {
    try {
        const stats = await getOrCreate()
        res.json({ projectsCount: stats.projectsCount, avgSavings: stats.avgSavings, updatedAt: stats.updatedAt })
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
    const projectsCount = wholeNumber(req.body.projectsCount)
    const avgSavings = wholeNumber(req.body.avgSavings)
    if (projectsCount === null || avgSavings === null) {
        return res.status(400).json({ message: 'Numbers must be whole and not negative' })
    }
    try {
        const stats = await getOrCreate()
        if (projectsCount !== undefined) stats.projectsCount = projectsCount
        if (avgSavings !== undefined) stats.avgSavings = avgSavings
        stats.updatedBy = req.manager._id
        await stats.save()
        res.json({ projectsCount: stats.projectsCount, avgSavings: stats.avgSavings, updatedAt: stats.updatedAt })
    } catch (error) {
        console.error('שגיאה בעדכון נתוני האתר:', error.message)
        res.status(400).json({ message: error.message })
    }
}

module.exports = { getStats, updateStats }
