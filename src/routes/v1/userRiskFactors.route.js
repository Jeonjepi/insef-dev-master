const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {userRiskFactorsValidation} = require('../../validations/');
const {userRiskFactorsController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(userRiskFactorsValidation.getUserRiskFactors), userRiskFactorsController.getUserRiskFactors);

router
    .route('/:userId/risk-factor')
    .get(validate(userRiskFactorsValidation.getUserRiskFactor), userRiskFactorsController.getUserRiskFactor)
    .post(ACCESS_RULES.ALL_USER, validate(userRiskFactorsValidation.createUserRiskFactor), userRiskFactorsController.createUserRiskFactor);
router
    .route('/:userId/risk-factor/:riskFactorId')
    .patch(ACCESS_RULES.ALL_USER, validate(userRiskFactorsValidation.updateUserRiskFactor), userRiskFactorsController.updateUserRiskFactor)
    .delete(ACCESS_RULES.ALL_USER, validate(userRiskFactorsValidation.deleteUserRiskFactor), userRiskFactorsController.deleteUserRiskFactor);

module.exports = router;
