const express = require('express');

const getCarById = require('../models/carModels').getCarById;

const router = express.Router();

//Car Routes
router.get('/car/:id', getCarById);

module.exports = {
    router
}