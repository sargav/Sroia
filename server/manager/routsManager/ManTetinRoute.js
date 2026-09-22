const express = require('express');
const router = express.Router();
const testimController=require('../controllerManager/ManTestinController')
const verifyJWT = require('../../middlewar/verifyJWT');

router.use(verifyJWT); 
router.get('/', testimController.getAllTestimonials)
router.post('/', testimController.addTestimonial)
router.put('/', testimController.updateTestimonial)
router.delete('/:id', testimController.deleteTestimonial)

module.exports = router