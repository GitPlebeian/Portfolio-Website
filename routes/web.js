const express = require('express')
const router = express.Router()
const webController = require('../controllers/web')
const trackingController = require('../controllers/tracking')

router.get('/', webController.homepage)
router.get('/financial', webController.financial)
router.post('/financial/createProfile', trackingController.createProfile)

module.exports = router
