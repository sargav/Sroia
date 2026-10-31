// הגנה על נתיבי הניהול: רק מי ששולח את מפתח המנהל הנכון יכול להיכנס.
// המפתח נשלח בכותרת (header) בשם x-admin-key, ונבדק מול משתנה הסביבה ADMIN_KEY.
// ב-Render מגדירים את ADMIN_KEY תחת Environment. מפתח ארוך ואקראי, ולא לשמור אותו בקוד.
//
// זה פתרון זמני עד שיהיה פאנל ניהול עם התחברות אמיתית (שם משתמש, סיסמה מוצפנת).
const crypto = require('crypto')

const requireAdminKey = (req, res, next) => {
    const adminKey = process.env.ADMIN_KEY

    // אם לא הוגדר מפתח בשרת - הנתיבים נשארים סגורים לכולם, ולא פתוחים לכולם
    if (!adminKey) {
        console.warn('נתיב ניהול נחסם: לא הוגדר ADMIN_KEY')
        return res.status(503).json({ message: 'Admin access is not configured' })
    }

    const sentKey = String(req.get('x-admin-key') || '')

    // השוואה בזמן קבוע (timingSafeEqual), כדי שאי אפשר יהיה לנחש את המפתח
    // לפי כמה זמן לקח לשרת לענות. הפונקציה דורשת שני ערכים באותו אורך, ולכן משווים קודם את האורך
    const sentBuffer = Buffer.from(sentKey)
    const keyBuffer = Buffer.from(adminKey)
    const isValid = sentBuffer.length === keyBuffer.length && crypto.timingSafeEqual(sentBuffer, keyBuffer)

    if (!isValid) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
}

module.exports = requireAdminKey
