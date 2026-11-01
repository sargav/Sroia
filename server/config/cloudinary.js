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

// כתובת להצגה באתר: רק הקטנה לרוחב מקסימלי 1600 (c_limit,w_1600),
// כך שתמונה של 5MB מהטלפון לא תאט את האתר. התמונה נשארת בפורמט שבו נשמרה (JPG).
// לא מוסיפים f_auto / f_jpg / q_auto: בבדיקה הם החזירו מסך שחור או 404 דרך הרשת
// (כנראה בגלל סינון אינטרנט), ואילו c_limit,w_1600 לבד עבד.
// המרה של HEIC מאייפון ל-JPG נעשית כבר בהעלאה (ראו ManImageController)
const optimizedUrl = (publicId) =>
    cloudinary.url(publicId, {
        secure: true,
        width: 1600,
        crop: 'limit',
        force_version: false, // בלי v1 בכתובת - בדיוק כמו הכתובת שנבדקה ועבדה
        urlAnalytics: false   // בלי ?_a=... בסוף הכתובת
    })

module.exports = { cloudinary, isCloudinaryConfigured, cloudinaryFolder, optimizedUrl }