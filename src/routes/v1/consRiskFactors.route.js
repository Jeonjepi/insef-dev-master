const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {consRiskFactorsValidation} = require('../../validations/');
const {consRiskFactorsController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(consRiskFactorsValidation.getConsRiskFactors), consRiskFactorsController.getConsRiskFactors)
    .post(ACCESS_RULES.ALL_USER, s3.upload.single("fk_photo"), validate(consRiskFactorsValidation.createConsRiskFactor), consRiskFactorsController.createConsRiskFactor);

router
    .route('/:riskFactorId')
    .get(validate(consRiskFactorsValidation.getConsRiskFactor), consRiskFactorsController.getConsRiskFactor)
    .patch(ACCESS_RULES.ALL_USER, s3.upload.single("fk_photo"), validate(consRiskFactorsValidation.updateConsRiskFactor), consRiskFactorsController.updateConsRiskFactor)
    .delete(ACCESS_RULES.ALL_USER, validate(consRiskFactorsValidation.deleteConsRiskFactor), consRiskFactorsController.deleteConsRiskFactor);

module.exports = router;
