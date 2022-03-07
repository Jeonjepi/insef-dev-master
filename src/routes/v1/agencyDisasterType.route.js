const express = require('express');
const validate = require('../../middlewares/validate');
const {ACCESS_RULES} = require("../../config/accessRules");
const {agencyDisasterTypeValidation} = require('../../validations/');
const {agencyDisasterTypeController} = require('../../controllers/');
const router = express.Router();

router
    .route('/:agencyId/disaster-type')
    .get(validate(agencyDisasterTypeValidation.getAgencyDisasterTypes), agencyDisasterTypeController.getAgencyDisasterTypes)
    .post(ACCESS_RULES.ALL_USER, validate(agencyDisasterTypeValidation.createAgencyDisasterType), agencyDisasterTypeController.createAgencyDisasterType);

router
    .route('/:agencyId/disaster-type/:agencyDisasterTypeId')
    .get(validate(agencyDisasterTypeValidation.getAgencyDisasterType), agencyDisasterTypeController.getAgencyDisasterType)
    .patch(ACCESS_RULES.ALL_USER, validate(agencyDisasterTypeValidation.updateAgencyDisasterType), agencyDisasterTypeController.updateAgencyDisasterType)
    .delete(ACCESS_RULES.ALL_USER, validate(agencyDisasterTypeValidation.deleteAgencyDisasterType), agencyDisasterTypeController.deleteAgencyDisasterType);

module.exports = router;
