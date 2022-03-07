const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {disasterTypeValidation} = require('../../validations/');
const {disasterTypeController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(disasterTypeValidation.getDisasterTypes), disasterTypeController.getDisasterTypes)
    .post(ACCESS_RULES.ALL_USER, validate(disasterTypeValidation.createDisasterType), disasterTypeController.createDisasterType);

router
    .route('/:disasterTypeId')
    .get(validate(disasterTypeValidation.getDisasterType), disasterTypeController.getDisasterType)
    .patch(ACCESS_RULES.ALL_USER, validate(disasterTypeValidation.updateDisasterType), disasterTypeController.updateDisasterType)
    .delete(ACCESS_RULES.ALL_USER, validate(disasterTypeValidation.deleteDisasterType), disasterTypeController.deleteDisasterType);

module.exports = router;
