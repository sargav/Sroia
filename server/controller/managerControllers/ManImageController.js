// ניהול התמונות באתר (תמונות בתים בבנייה / בסיום, וצילומי המלצות מהוואטסאפ) - למנהלים בלבד.
// הקבצים נשמרים ב-Cloudinary, ובמסד הנתונים נשמרים רק הפרטים שלהם (מודל Image)
const mongoose = require('mongoose')
const Image = require('../../models/Image')
const { IMAGE_CATEGORIES } = require('../../models/Image')
const { cloudinary, isCloudinaryConfigured, cloudinaryFolder } = require('../../config/cloudinary')

// פורמטים שדפדפנים לא תמיד מציגים (HEIC מאייפון) או שסינוני אינטרנט חוסמים (AVIF) -
// נשמרים ב-Cloudinary כ-JPG כבר בהעלאה
const CONVERT_TO_JPG = ['image/heic', 'image/heif', 'image/avif']

// שולח קובץ מהזיכרון (buffer מ-multer) ל-Cloudinary ומחזיר את התשובה שלו
const uploadBuffer = (buffer, folder, mimetype) =>
    new Promise((resolve, reject) => {
        const options = { folder, resource_type: 'image' }
        if (CONVERT_TO_JPG.includes(mimetype)) options.format = 'jpg'

        const stream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => (error ? reject(error) : resolve(result))
        )
        stream.end(buffer)
    })

// כל התמונות, אפשר לסנן לפי קטגוריה: ?category=start
const getAll = async (req, res) => {
    try {
        const { category } = req.query
        const filter = {}
        if (category !== undefined) {
            if (!IMAGE_CATEGORIES.includes(category)) {
                return res.status(400).json({ message: `category must be one of: ${IMAGE_CATEGORIES.join(', ')}` })
            }
            filter.category = category
        }
        const images = await Image.find(filter).sort({ category: 1, order: 1, createdAt: 1 }).lean()
        res.json(images)
    } catch (error) {
        console.error('getAll images:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// העלאת תמונה אחת או כמה (עד 20) לקטגוריה אחת.
// הקליינט שולח FormData עם category, clientName (לא חובה) והקבצים בשדה images
const uploadImages = async (req, res) => {
    try {
        if (!isCloudinaryConfigured()) {
            console.warn('העלאת תמונות נחסמה: חסרים פרטי CLOUDINARY ב-.env')
            return res.status(503).json({ message: 'Image upload is not configured' })
        }

        const { category, clientName } = req.body
        if (!IMAGE_CATEGORIES.includes(category)) {
            return res.status(400).json({ message: `category must be one of: ${IMAGE_CATEGORIES.join(', ')}` })
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images were sent' })
        }

        // התמונות החדשות נכנסות בסוף הקטגוריה
        const last = await Image.findOne({ category }).sort({ order: -1 }).lean()
        let nextOrder = last ? last.order + 1 : 0

        const created = []
        const failed = []
        // אחת אחרי השנייה, כדי ששגיאה בתמונה אחת לא תפיל את כל השאר
        for (const file of req.files) {
            try {
                const result = await uploadBuffer(file.buffer, cloudinaryFolder(category), file.mimetype)
                const image = await Image.create({
                    url: result.secure_url,
                    publicId: result.public_id,
                    category,
                    order: nextOrder++,
                    originalName: file.originalname,
                    clientName: clientName ? String(clientName) : ''
                })
                created.push(image)
            } catch (error) {
                console.error('העלאת תמונה נכשלה:', file.originalname, '-', error.message)
                failed.push(file.originalname)
            }
        }

        console.log(`${created.length} תמונות הועלו ל-${category}, על ידי: ${req.manager?.manName}`)

        if (created.length === 0) {
            return res.status(502).json({ message: 'Upload failed', failed })
        }
        res.status(201).json({ created, failed })
    } catch (error) {
        console.error('uploadImages:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// עדכון סדר הצגה, טקסט חלופי או שם הממליץ
const updateImage = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const image = await Image.findById(id)
        if (!image) return res.status(404).json({ message: 'Image not found' })

        const { order, alt, clientName } = req.body
        if (order !== undefined) {
            if (!Number.isInteger(Number(order)) || Number(order) < 0) {
                return res.status(400).json({ message: 'order must be a whole number, 0 or more' })
            }
            image.order = Number(order)
        }
        if (alt !== undefined) image.alt = String(alt)
        if (clientName !== undefined) image.clientName = String(clientName)

        await image.save()
        res.json(image)
    } catch (error) {
        console.error('updateImage:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

// מחיקת תמונה - קודם מ-Cloudinary, ורק אם הצליח - ממסד הנתונים
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid id' })
        }
        const image = await Image.findById(id)
        if (!image) return res.status(404).json({ message: 'Image not found' })

        if (!isCloudinaryConfigured()) {
            return res.status(503).json({ message: 'Image upload is not configured' })
        }

        // 'not found' ב-Cloudinary זה בסדר - הקובץ כבר לא שם, ממשיכים למחוק את הרשומה
        const result = await cloudinary.uploader.destroy(image.publicId)
        if (result.result !== 'ok' && result.result !== 'not found') {
            console.error('מחיקה מ-Cloudinary נכשלה:', image.publicId, result)
            return res.status(502).json({ message: 'Could not delete the image from storage' })
        }

        await image.deleteOne()
        console.log(`תמונה נמחקה מ-${image.category}: ${image.originalName || image.publicId}, על ידי: ${req.manager?.manName}`)
        res.json({ message: 'Image deleted' })
    } catch (error) {
        console.error('deleteImage:', error.message)
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { getAll, uploadImages, updateImage, deleteImage }