const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data')

router.get('/getspydata', dataController.getspydata)

module.exports = router
