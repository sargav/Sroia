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

// כתובת מותאמת להצגה באתר: JPG, איכות אוטומטית, ורוחב מקסימלי 1600 -
// כך שתמונה של 5MB מהטלפון לא תאט את האתר.
// לא משתמשים ב-f_auto (WebP/AVIF): סינוני אינטרנט (כמו נטפרי) מחליפים תמונות כאלה בפיקסל ריק.
// JPG מוצג בכל דפדפן ועובר דרך כל סינון, וגם ממיר תמונות HEIC מאייפון לפורמט שהדפדפן מכיר
const optimizedUrl = (publicId) =>
    cloudinary.url(publicId, {
        secure: true,
        fetch_format: 'jpg',
        quality: 'auto',
        width: 1600,
        crop: 'limit'
    })

module.exports = { cloudinary, isCloudinaryConfigured, cloudinaryFolder, optimizedUrl }