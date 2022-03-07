const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {agencyRiskFactorsValidation} = require('../../validations/');
const {agencyRiskFactorsController} = require('../../controllers/');
const {agencyController} = require("../../controllers");
const router = express.Router();

router
    .route('/:agencyId/risk-factor')
    .get(validate(agencyRiskFactorsValidation.getAgencyRiskFactors), agencyRiskFactorsController.getAgencyRiskFactors)
    .post(ACCESS_RULES.ALL_USER, s3.upload.single("ar_photo"), validate(agencyRiskFactorsValidation.createAgencyRiskFactor), agencyRiskFactorsController.createAgencyRiskFactor);

router
    .route('/:agencyId/risk-factor/element')
    .get(ACCESS_RULES.ALL_USER, validate(agencyRiskFactorsValidation.getAgencyRiskFactorElementByElement), agencyRiskFactorsController.getAgencyRiskFactorElementByElement)

router
    .route('/:agencyId/risk-factor/factor')
    .get(ACCESS_RULES.ALL_USER, validate(agencyRiskFactorsValidation.getAgencyRiskFactorFactorByFactor), agencyRiskFactorsController.getAgencyRiskFactorFactorByFactor)

router
    .route('/:agencyId/risk-factor/element-factor')
    .get(ACCESS_RULES.ALL_USER, validate(agencyRiskFactorsValidation.getAgencyRiskFactorElementFactor), agencyRiskFactorsController.getAgencyRiskFactorElementFactor)

router
    .route('/:agencyId/risk-factor/measures')
    .get(ACCESS_RULES.ALL_USER, validate(agencyRiskFactorsValidation.getAgencyRiskMeasuresById), agencyRiskFactorsController.getAgencyRiskMeasuresById)

router
    .route('/:agencyId/risk-factor/measures_detail')
    .get(ACCESS_RULES.ALL_USER, validate(agencyRiskFactorsValidation.getAgencyRiskMeasuresDetailById), agencyRiskFactorsController.getAgencyRiskMeasuresDetailById)

router
    .route('/:agencyId/risk-factor/measures_with_extra_info')
    .get(ACCESS_RULES.ALL_USER, validate(agencyRiskFactorsValidation.getAgencyRiskMeasuresDetailAndRule), agencyRiskFactorsController.getAgencyRiskMeasuresDetailAndRule);

router
    .route('/:agencyId/risk-factor/:agencyRiskFactorId')
    .get(validate(agencyRiskFactorsValidation.getAgencyRiskFactor), agencyRiskFactorsController.getAgencyRiskFactor)
    .patch(ACCESS_RULES.ALL_USER, s3.upload.single("ar_photo"), validate(agencyRiskFactorsValidation.updateAgencyRiskFactor), agencyRiskFactorsController.updateAgencyRiskFactor)
    .delete(ACCESS_RULES.ALL_USER, validate(agencyRiskFactorsValidation.deleteAgencyRiskFactor), agencyRiskFactorsController.deleteAgencyRiskFactor);

module.exports = router;
