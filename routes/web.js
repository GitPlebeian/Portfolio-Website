const express = require('express');
const router = express.Router();
const webController = require('../controllers/web')

router.get('/', webController.homepage)
router.get('/financial', webController.financial)

module.exports = router
