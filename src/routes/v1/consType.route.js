const express = require('express');
const validate = require('../../middlewares/validate');
const {ACCESS_RULES} = require("../../config/accessRules");
const {consTypeValidation} = require('../../validations/');
const {consTypeController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(consTypeValidation.getConsType), consTypeController.getConsType)
    .post(ACCESS_RULES.ALL_USER, validate(consTypeValidation.createConsType), consTypeController.createConsType);

router
    .route('/:consTypeId')
    .delete(ACCESS_RULES.ALL_USER, validate(consTypeValidation.deleteConsTypeById), consTypeController.deleteConsTypeById);

module.exports = router;