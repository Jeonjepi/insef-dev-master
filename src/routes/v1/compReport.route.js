const express = require('express');
const validate = require('../../middlewares/validate');
const {ACCESS_RULES} = require("../../config/accessRules");
const {agencyValidation} = require('../../validations/');
const {compReportController} = require('../../controllers/');

const router = express.Router();

router
    .route("/:consId/:round/report")
    .get(compReportController.getCompReport);

router
    .route("/:consId/:round/report/pdf")
    .get(compReportController.getCompReportPDF);

router
    .route("/:consId/:round/report/sign/send")
    .post(compReportController.sendCompleteReportToEmailAndSMS);

router
    .route("/:consId/:round/report/sign")
    .get(compReportController.sendCompleteReportPageForSign);

module.exports = router;
