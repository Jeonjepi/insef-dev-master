const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {processValidation} = require('../../validations/');
const {processController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(processValidation.getProcesses), processController.getProcesses)
    .post(ACCESS_RULES.ALL_USER, validate(processValidation.createProcess), processController.createProcess);

router
    .route('/:processId')
    .get(ACCESS_RULES.ALL_USER, validate(processValidation.getProcess), processController.getProcess)
    .patch(ACCESS_RULES.ALL_USER, validate(processValidation.updateProcess), processController.updateProcess)
    .delete(ACCESS_RULES.ALL_USER, validate(processValidation.deleteProcess), processController.deleteProcess);

module.exports = router;
