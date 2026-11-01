const multer = require('multer')

const MAX_FILE_SIZE_MB = 10
const MAX_FILES = 20
const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'image/avif'
]
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE_MB * 1024 * 1024, // בבייטים
        files: MAX_FILES
    },
    // רק תמונות. כל קובץ אחר נדחה עוד לפני שהוא מגיע לקונטרולר
    fileFilter: (req, file, cb) => {
        if (ALLOWED_TYPES.includes(file.mimetype)) return cb(null, true)
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname))
    }
})
const uploadImages = (req, res, next) => {
    upload.array('images', MAX_FILES)(req, res, (err) => {
        if (!err) return next()
        if (err instanceof multer.MulterError) {
            const messages = {
                LIMIT_FILE_SIZE: `Each image must be up to ${MAX_FILE_SIZE_MB}MB`,
                LIMIT_FILE_COUNT: `Up to ${MAX_FILES} images at a time`,
                LIMIT_UNEXPECTED_FILE: 'Only image files (JPG, PNG, WEBP, HEIC, AVIF) in a field named "images"'
            }
            return res.status(400).json({ message: messages[err.code] || 'Invalid upload' })
        }
        console.error('uploadImages:', err.message)
        res.status(500).json({ message: 'Server error' })
    })
}

module.exports = uploadImages