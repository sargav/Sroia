const express = require('express')
const router = express.Router()
const controller = require('../controller/managerControllers/ManTestiUrlController')
const verifyJWT = require('../middleware/verifyJWT')

// כל הנתיבים כאן למנהלים בלבד
router.use(verifyJWT)

router.get('/', controller.getAll)          // כל הסרטונים
router.get('/:id', controller.getById)      // סרטון אחד
router.post('/', controller.addUrl)         // הוספה
router.patch('/:id', controller.updateUrl)  // עדכון
router.delete('/:id', controller.deleteUrl) // מחיקה

module.exports = router
