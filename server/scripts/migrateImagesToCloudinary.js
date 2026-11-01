// סקריפט חד-פעמי: מעלה ל-Cloudinary את כל התמונות שנמצאות היום בתיקיות
// public/start, public/finish ו-public/Testimonials, ושומר אותן במסד הנתונים (מודל Image).
//
// הרצה, מתוך התיקייה server:
//   node scripts/migrateImagesToCloudinary.js
//
// אפשר להריץ שוב בבטחה: תמונה שכבר הועברה (לפי שם הקובץ והקטגוריה) מדולגת.
// חשוב: להריץ מול מסד הנתונים האמיתי (Atlas), כי שם האתר שבאוויר קורא את התמונות
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const Image = require('../models/Image')
const { IMAGE_CATEGORIES } = require('../models/Image')
const { cloudinary, isCloudinaryConfigured, cloudinaryFolder } = require('../config/cloudinary')

const run = async () => {
    if (!isCloudinaryConfigured()) {
        console.log('חסרים CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET ב-.env')
        return process.exit(1)
    }

    await mongoose.connect(process.env.DATABASE_URI)
    console.log('מחובר למסד הנתונים')

    let uploaded = 0
    let skipped = 0
    let failed = 0

    for (const category of IMAGE_CATEGORIES) {
        const dir = path.join(__dirname, '..', 'public', category)
        if (!fs.existsSync(dir)) {
            console.log(`אין תיקייה ${category}, מדלגים`)
            continue
        }

        // מיון לפי שם, כדי שהסדר יהיה קבוע
        const files = fs.readdirSync(dir)
            .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
            .sort()

        // ממשיכים את הסדר אחרי תמונות שכבר קיימות בקטגוריה
        const last = await Image.findOne({ category }).sort({ order: -1 }).lean()
        let nextOrder = last ? last.order + 1 : 0

        console.log(`\n${category}: ${files.length} קבצים`)
        for (const file of files) {
            const exists = await Image.exists({ category, originalName: file })
            if (exists) {
                skipped++
                console.log(`  כבר קיים, מדלגים: ${file}`)
                continue
            }
            try {
                const result = await cloudinary.uploader.upload(path.join(dir, file), {
                    folder: cloudinaryFolder(category),
                    resource_type: 'image'
                })
                await Image.create({
                    url: result.secure_url,
                    publicId: result.public_id,
                    category,
                    order: nextOrder++,
                    originalName: file
                })
                uploaded++
                console.log(`  הועלה: ${file}`)
            } catch (error) {
                failed++
                console.error(`  נכשל: ${file} - ${error.message}`)
            }
        }
    }

    console.log(`\nסיום. הועלו: ${uploaded}, דולגו: ${skipped}, נכשלו: ${failed}`)
    await mongoose.disconnect()
    process.exit(failed > 0 ? 1 : 0)
}

run().catch((err) => {
    console.error(err.message)
    process.exit(1)
})
