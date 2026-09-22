const express = require('express');
const app = express.Router();
const TestiUrlsController = require('../controller/TestiUrlsController');

app.get('/:type', TestiUrlsController.getByType);

module.exports = app;