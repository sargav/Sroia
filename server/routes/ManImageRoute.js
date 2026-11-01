const express = require('express')
const router = express.Router()
const controller = require('../controller/managerControllers/ManImageController')
const verifyJWT = require('../middleware/verifyJWT')
const uploadImages = require('../middleware/uploadImages')

// כל הנתיבים כאן למנהלים בלבד
router.use(verifyJWT)

router.get('/', controller.getAll)                         // כל התמונות (?category=start)
router.post('/', uploadImages, controller.uploadImages)    // העלאה: FormData עם category + images
router.patch('/:id', controller.updateImage)               // סדר הצגה / טקסט חלופי
router.delete('/:id', controller.deleteImage)              // מחיקה (גם מ-Cloudinary)

module.exports = router
