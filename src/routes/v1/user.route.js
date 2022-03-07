const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");

const router = express.Router();

router
    .route('/')
    .get(ACCESS_RULES.ALL_USER, validate(userValidation.getUsers), userController.getUsers)
    .post(ACCESS_RULES.ALL_USER, s3.upload.single("us_thumbnail"), validate(userValidation.createUser), userController.createUser)

router
    .route('/:userId')
    .get(ACCESS_RULES.ALL_USER, validate(userValidation.getUser), userController.getUserById)
    .delete(ACCESS_RULES.ALL_USER, validate(userValidation.deleteUserById), userController.deleteUser)
    .patch(ACCESS_RULES.ALL_USER, validate(userValidation.updateUserById), userController.updateUser);

router
    .route('/:userId/info')
    .get(userController.getUserInfo);

router
    .route('/:userId/cons')
    .get(userController.getUserCons);

router
    .route('/:userId/report')
    .get(ACCESS_RULES.ALL_USER, userController.getUserReport);

router
    .route('/:userId/support')
    .get(ACCESS_RULES.ALL_USER, userController.getUserSupport);

router
    .route('/:userId/support1')
    .get(ACCESS_RULES.ALL_USER, userController.getSupportByConsAndConsCompanyName);

module.exports = router;
