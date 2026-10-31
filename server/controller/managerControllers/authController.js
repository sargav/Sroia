const bcrypt = require('bcrypt')          // השוואת סיסמה מול הסיסמה המוצפנת
const jwt = require('jsonwebtoken')       // יצירת טוקנים ובדיקתם
const Manager = require('../../models/Manager')
const checking = require('../../functionChecking/functionChecking')

// הגדרות העוגייה ששומרת את טוקן הרענון.
// משתמשים בהן גם ביצירה (login) וגם במחיקה (logout) - חייבות להיות זהות
const cookieOptions = {
    httpOnly: true,                    // JavaScript בדפדפן לא יכול לקרוא אותה, רק הדפדפן שולח אותה לשרת
    secure: true,                      // נשלחת רק בחיבור https מוצפן
    sameSite: 'None',                  // נדרש כי האתר והשרת בדומיינים שונים
    maxAge: 1 * 24 * 60 * 60 * 1000    // כמה זמן הדפדפן שומר אותה: יום אחד (במילישניות)
}

// פונקציית עזר: יוצרת טוקן גישה קצר מפרטי המנהל.
// login ו-refresh שתיהן צריכות אותה, ולכן היא נפרדת
const createAccessToken = (manager) => {
    // מה שייכתב בתוך הטוקן. בלי סיסמה - את התוכן של טוקן כל אחד יכול לקרוא
    const managerInfo = {
        _id: manager._id,
        name: manager.name,
        manName: manager.manName,
        email: manager.email
    }
    // חותמים עם המפתח הסודי מ-.env. בלי המפתח אי אפשר לזייף או לשנות טוקן
    return jwt.sign(managerInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

// הערה על הלוגים: אף פעם לא מדפיסים סיסמאות או טוקנים - מי שרואה את הלוג יראה אותם

const login = async (req, res) => {
    try {
        const { manName, password } = req.body

        if (!manName || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const foundManager = await Manager.findOne({ manName: String(manName).trim() }).lean()
        if (!foundManager) {
            // ניסיון עם שם שלא קיים - אם יש הרבה כאלה, מישהו מנסה לנחש
            console.warn('התחברות נכשלה - שם משתמש לא קיים:', String(manName).trim())
            return res.status(401).json({ message: 'Unauthorized' })
        }

        // bcrypt מצפין את הסיסמה שהוקלדה ובודק אם היא מתאימה למוצפנת שבמסד
        const match = await bcrypt.compare(password, foundManager.password)
        if (!match) {
            console.warn('התחברות נכשלה - סיסמה שגויה:', foundManager.manName)
            return res.status(401).json({ message: 'Unauthorized' })
        }

        // טוקן גישה קצר (15 דקות) - נשלח בכותרת Authorization בכל קריאה מוגנת
        const accessToken = createAccessToken(foundManager)

        // טוקן רענון (יום אחד) - רק כדי לקבל טוקן גישה חדש.
        // מספיק בו manName כדי למצוא את המנהל שוב. נחתם במפתח נפרד
        const refreshToken = jwt.sign(
            { manName: foundManager.manName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } // חייב להתאים ל-maxAge של העוגייה
        )

        // טוקן הרענון נכנס לעוגייה מאובטחת - הדפדפן שומר אותה לבד
        res.cookie('jwt', refreshToken, cookieOptions)

        console.log('מנהל התחבר:', foundManager.manName)

        // טוקן הגישה חוזר ב-JSON - הקליינט שומר אותו בזיכרון
        res.json({ accessToken })
    } catch (error) {
        // השגיאה המלאה רק בלוג של השרת, ללקוח הודעה כללית
        console.error('login:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== טוקן גישה חדש =====
const refresh = async (req, res) => {
    // את req.cookies ממלא cookie-parser. ה-?. מונע קריסה אם אין עוגיות בכלל
    const refreshToken = req.cookies?.jwt
    // בלי עוגייה - מצב רגיל (לא מחובר), לא מדפיסים כדי לא להציף את הלוג
    if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' })

    let decoded
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        // פג תוקף = רגיל. חתימה לא תקינה = מישהו שלח טוקן מזויף
        console.warn('refresh נדחה:', error.message)
        return res.status(403).json({ message: 'Forbidden' })
    }

    try {
        const foundManager = await Manager.findOne({ manName: decoded.manName }).lean()
        if (!foundManager) {
            // טוקן תקין של מנהל שנמחק
            console.warn('refresh נדחה - המנהל לא קיים יותר:', decoded.manName)
            return res.status(401).json({ message: 'Unauthorized' })
        }
        res.json({ accessToken: createAccessToken(foundManager) })
    } catch (error) {
        console.error('refresh:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// ===== התנתקות =====
const logout = (req, res) => {
    // clearCookie לא צריך את maxAge, ולכן מוציאים אותו ושולחים את שאר ההגדרות
    const { maxAge, ...clearOptions } = cookieOptions
    res.clearCookie('jwt', clearOptions)
    console.log('מנהל התנתק')
    res.json({ message: 'Logged out' })
}

const register = async (req, res) => {
    try {
        const { name, manName, email, phone, password } = req.body

        if (!name || !manName || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (!checking.isValidName(String(name))) {
            return res.status(400).json({ message: 'Invalid name' })
        }
        if (!checking.isValidEmail(String(email))) {
            return res.status(400).json({ message: 'Invalid email' })
        }
        if (!checking.isValidPhone(String(phone))) {
            return res.status(400).json({ message: 'Invalid phone' })
        }
        if (!checking.isValidPassword(String(password))) {
            return res.status(400).json({ message: 'Password must be at least 6 characters with letters and numbers' })
        }

        const duplicateName = await Manager.findOne({ manName: String(manName).trim() }).lean()
        if (duplicateName) {
            return res.status(409).json({ message: 'Manager name already exists' })
        }
        const duplicateEmail = await Manager.findOne({ email: String(email).toLowerCase().trim() }).lean()
        if (duplicateEmail) {
            return res.status(409).json({ message: 'Email already exists' })
        }

        const hashedPwd = await bcrypt.hash(password, 10)
        const manager = await Manager.create({ name, manName, email, phone, password: hashedPwd })

        // מי הוסיף את מי - req.manager מגיע מ-verifyJWT
        console.log(`מנהל חדש נוסף: ${manager.manName}, על ידי: ${req.manager?.manName}`)

        res.status(201).json({ message: `New manager ${manager.manName} created` })
    }
    catch (error) {
        console.error('register:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { register, login, refresh, logout }