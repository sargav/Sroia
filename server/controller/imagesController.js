// הכתובת הציבורית שהאתר משתמש בה: GET /api/images/:folderName
// מחזירה מערך של כתובות תמונות לפי הסדר.
// קודם בודקים במסד הנתונים (תמונות ב-Cloudinary). אם עוד אין שם תמונות לקטגוריה הזו -
// קוראים מהתיקייה ב-public כמו קודם, כך שהאתר ממשיך לעבוד גם לפני ההעברה ל-Cloudinary
const fs = require('fs')
const path = require('path')
const Image = require('../models/Image')
const { IMAGE_CATEGORIES } = require('../models/Image')
const { optimizedUrl } = require('../config/cloudinary')

const returnImage = async (req, res) => {
    const folderName = String(req.params.folderName)

    if (!IMAGE_CATEGORIES.includes(folderName)) {
        return res.status(400).json({ error: 'תיקייה לא חוקית' })
    }

    try {
        const images = await Image.find({ category: folderName }).sort({ order: 1, createdAt: 1 }).lean()
        if (images.length > 0) {
            // כתובות מלאות של Cloudinary, מותאמות לגודל ולפורמט
            return res.json(images.map((image) => optimizedUrl(image.publicId)))
        }
    } catch (error) {
        // אם מסד הנתונים לא זמין - ממשיכים לתיקייה, כדי שהאתר לא יישאר בלי תמונות
        console.error('returnImage (db):', error.message)
    }

    const dir = path.join(__dirname, '..', 'public', folderName)
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'שגיאה בקריאת התמונות' })
        }
        const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
        res.json(imageFiles.map((f) => `/${folderName}/${f}`))
    })
}

module.exports = returnImage
