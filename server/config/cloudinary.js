// הגדרות החיבור ל-Cloudinary (שירות הענן שבו נשמרות התמונות).
// שלושת הפרטים נמצאים ב-.env וב-Render תחת Environment - אף פעם לא בקוד
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // כתובות https בלבד
})

// האם כל שלושת הפרטים הוגדרו. בלעדיהם אי אפשר להעלות או למחוק תמונות
const isCloudinaryConfigured = () =>
    Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET)

// התיקייה ב-Cloudinary לכל קטגוריה, למשל sroia/start
const cloudinaryFolder = (category) => `sroia/${category}`

// כתובת מותאמת להצגה באתר: פורמט ואיכות אוטומטיים (webp/avif כשהדפדפן תומך),
// ורוחב מקסימלי 1600 - כך שתמונה של 5MB מהטלפון לא תאט את האתר
const optimizedUrl = (publicId) =>
    cloudinary.url(publicId, {
        secure: true,
        fetch_format: 'auto',
        quality: 'auto',
        width: 1600,
        crop: 'limit'
    })

module.exports = { cloudinary, isCloudinaryConfigured, cloudinaryFolder, optimizedUrl }
