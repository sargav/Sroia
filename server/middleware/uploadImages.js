// קבלת קבצי תמונות מהקליינט עם multer (כמו בקובץ EX13).
// memoryStorage - הקובץ נשאר בזיכרון (req.files[i].buffer) ולא נשמר בדיסק,
// כי הדיסק של Render מתאפס בכל deploy. משם הוא נשלח ישר ל-Cloudinary
const multer = require('multer')

const MAX_FILE_SIZE_MB = 10
const MAX_FILES = 20
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE_MB * 1024 * 1024,
        files: MAX_FILES
    },
    // רק תמונות. כל קובץ אחר נדחה עוד לפני שהוא מגיע לקונטרולר
    fileFilter: (req, file, cb) => {
        if (ALLOWED_TYPES.includes(file.mimetype)) return cb(null, true)
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname))
    }
})

// עוטף את multer כדי ששגיאה (קובץ גדול מדי, סוג לא נתמך) תחזיר 400 עם הודעה ברורה
// במקום להגיע לטיפול השגיאות הכללי של השרת
const uploadImages = (req, res, next) => {
    upload.array('images', MAX_FILES)(req, res, (err) => {
        if (!err) return next()
        if (err instanceof multer.MulterError) {
            const messages = {
                LIMIT_FILE_SIZE: `Each image must be up to ${MAX_FILE_SIZE_MB}MB`,
                LIMIT_FILE_COUNT: `Up to ${MAX_FILES} images at a time`,
                LIMIT_UNEXPECTED_FILE: 'Only JPG, PNG or WEBP images in a field named "images"'
            }
            return res.status(400).json({ message: messages[err.code] || 'Invalid upload' })
        }
        console.error('uploadImages:', err.message)
        res.status(500).json({ message: 'Server error' })
    })
}

module.exports = uploadImages
