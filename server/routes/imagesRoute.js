const express = require('express');
const router = express.Router();
const returnImage= require('../controller/imagesController');

router.get('/:folderName', returnImage);

module.exports = router;