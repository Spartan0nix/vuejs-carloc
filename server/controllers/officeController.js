const express = require('express');

const getOffice = require('../models/officeModels').getOffice;

const router = express.Router();

//Office Routes
router.get('/office', getOffice);

module.exports = {
    router
}