const express = require('express');
const router = express.Router();
const webController = require('../controllers/web')

router.get('/', webController.homepage)

module.exports = router
