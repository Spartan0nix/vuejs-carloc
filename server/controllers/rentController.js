const express = require('express');

const rent = require('../models/rentModels');
const authJwt = require('../middleware/verifyAuth');

const router = express.Router();

//Rents Routes
router.get('/rents', rent.getRents);
router.put('/rent/updateRent', [authJwt.verifyToken], rent.udpateRent);

module.exports = {
    router
}