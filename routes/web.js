const express = require('express')
const router = express.Router()
const webController = require('../controllers/web')
const trackingController = require('../controllers/tracking')

router.get('/', webController.homepage)
router.get('/financial', webController.financial)
router.post('/financial/createProfile', trackingController.createProfile)
router.post('/financial/renameProfile', trackingController.renameProfile)
router.post('/financial/deleteProfile', trackingController.deleteProfile)
router.get('/financial/viewProfile', trackingController.viewProfile)
router.post('/financial/createTrade', trackingController.createTrade)

module.exports = router
