// הכתובת הציבורית שהאתר משתמש בה: GET /api/images/:folderName
// מחזירה מערך של תמונות: { url, alt, clientName }
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
            return res.json(images.map((image) => ({
                url: optimizedUrl(image.publicId), // כתובת Cloudinary מוקטנת ודחוסה
                alt: image.alt,
                clientName: image.clientName
            })))
        }
    } catch (error) {
        // אם מסד הנתונים לא זמין - ממשיכים לתיקייה, כדי שהאתר לא יישאר בלי תמונות
        console.error('returnImage (db):', error.message)
    }

    // גיבוי: התמונות הישנות מהתיקייה, באותו מבנה
    const dir = path.join(__dirname, '..', 'public', folderName)
    fs.readdir(dir, (err, files) => {
        // התיקיות הישנות נמחקו אחרי ההעברה ל-Cloudinary - אין תיקייה = אין תמונות, לא שגיאה
        if (err && err.code === 'ENOENT') {
            return res.json([])
        }
        if (err) {
            console.error(err)
            return res.status(500).json({ error: 'שגיאה בקריאת התמונות' })
        }
        const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
        res.json(imageFiles.map((f) => ({ url: `/${folderName}/${f}`, alt: '', clientName: '' })))
    })
}

module.exports = returnImage