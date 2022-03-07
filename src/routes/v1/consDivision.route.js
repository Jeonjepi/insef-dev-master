const express = require('express');
const validate = require('../../middlewares/validate');
const {ACCESS_RULES} = require("../../config/accessRules");
const {consDivisionValidation} = require('../../validations/');
const {consDivisionController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(consDivisionValidation.getConsDivision), consDivisionController.getConsDivision)
    .post(ACCESS_RULES.ALL_USER, validate(consDivisionValidation.createConsDivision), consDivisionController.createConsDivision);

router
    .route('/:consDivisionId')
    .delete(ACCESS_RULES.ALL_USER, validate(consDivisionValidation.deleteConsDivisionById), consDivisionController.deleteConsDivisionById);

module.exports = router;