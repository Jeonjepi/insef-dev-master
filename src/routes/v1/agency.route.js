const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {agencyValidation} = require('../../validations/');
const {agencyController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(agencyValidation.getAgencies), agencyController.getAgencies)
    .post(s3.upload.single("ag_regist_photo"), validate(agencyValidation.createAgency), agencyController.createAgency);
router
    .route('/:agencyId')
    .get(validate(agencyValidation.getAgencyById), agencyController.getAgencyById)
    .patch(ACCESS_RULES.EXCLUDE_AGENT, s3.upload.single("ag_regist_photo"),validate(agencyValidation.updateAgencyById), agencyController.updateAgencyById)
    .delete(ACCESS_RULES.ADMIN, validate(agencyValidation.deleteAgencyById), agencyController.deleteAgencyById);

router
    .route('/:agencyId/overview')
    .get(ACCESS_RULES.ALL_USER, validate(agencyValidation.getOverview), agencyController.getOverview);



module.exports = router;
