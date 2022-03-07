const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {consManagerValidation} = require('../../validations/');
const {consManagerController} = require('../../controllers/');

const router = express.Router();

router
    .route('/:consId/manager')
    .get(ACCESS_RULES.ALL_USER, validate(consManagerValidation.getConsManager), consManagerController.getConsManager)
    .post(ACCESS_RULES.ALL_USER, validate(consManagerValidation.createConsManager), consManagerController.createConsManager);

router
    .route('/:consId/manager/:consManagerId')
    .patch(ACCESS_RULES.ALL_USER, validate(consManagerValidation.updateConsManager), consManagerController.updateConsManager)
    .delete(ACCESS_RULES.ALL_USER, validate(consManagerValidation.deleteConsManager), consManagerController.deleteConsManager);

module.exports = router;
