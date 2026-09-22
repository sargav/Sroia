const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const testimonialController = require('../controller/testimonialController');

router.get('/:type', testimonialController.getByType);
router.get('/', testimonialController.getAll);

module.exports = router;