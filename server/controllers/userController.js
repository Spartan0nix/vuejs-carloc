const express = require('express');

const user = require('../models/userModels');
const verifySignUp  = require('../middleware/verifySignUp');
const authJwt = require('../middleware/verifyAuth');

const router = express.Router();

//Users Routes
//Register and Login
router.post('/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], user.signup);
router.post('/auth/signin', user.signin);

//Check Roles
router.get('/auth/role', [authJwt.verifyToken], user.findRole);

//User ressources
router.get('/auth/user', [authJwt.verifyToken], user.userContent);

//Admin ressources
router.get('/auth/admin', [authJwt.verifyToken, authJwt.isAdmin], user.adminBoard);

//Moderator ressources
router.get('/auth/mod', [authJwt.verifyToken, authJwt.isModOrAdmin], user.managementBoard);

//Update user info
router.put('/auth/update', [authJwt.verifyToken], user.updateUser);
router.put('/auth/updatePasswd', [authJwt.verifyToken], user.changeUserPassword);

module.exports = {
    router
}