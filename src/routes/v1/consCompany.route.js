const express = require('express');
const validate = require('../../middlewares/validate');
const {ACCESS_RULES} = require("../../config/accessRules");
const {consCompanyValidation} = require('../../validations/');
const {consCompanyController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(ACCESS_RULES.ALL_USER, validate(consCompanyValidation.getConsCompanies), consCompanyController.getConsCompanies)
    .post(validate(consCompanyValidation.createConsCompany), consCompanyController.createConsCompany);

router
    .route('/:consCompanyId')
    .get(ACCESS_RULES.ALL_USER, validate(consCompanyValidation.getConsCompany), consCompanyController.getConsCompanyById)
    .delete(ACCESS_RULES.EXCLUDE_AGENT, validate(consCompanyValidation.deleteConsCompany), consCompanyController.deleteConsCompanyById)
    .patch(ACCESS_RULES.EXCLUDE_AGENT, validate(consCompanyValidation.updateConsCompany), consCompanyController.updateConsCompanyById);


module.exports = router;
