const express = require('express');
const validate = require('../../middlewares/validate');
const {ACCESS_RULES} = require("../../config/accessRules");
const {supportValidation} = require('../../validations/');
const {supportController} = require('../../controllers/');

const router = express.Router();

router
    .route('/cons/:consId/support/:supportId/user')
    .post(ACCESS_RULES.ALL_USER, validate(supportValidation.assignSupportAgent), supportController.assignSupportAgentByConsAndUserId)
    .patch(ACCESS_RULES.ALL_USER, validate(supportValidation.updateSupportAgent), supportController.updateSupportAgentByConsAndUserId);

router
    .route('/cons/:consId/support/user/release')
    .post(ACCESS_RULES.ALL_USER, validate(supportValidation.releaseSupportAgent), supportController.releaseSupportAgent);

router
    .route('/cons/:consId/support')
    .post(ACCESS_RULES.ALL_USER, validate(supportValidation.createSupport), supportController.createSupport);

router
    .route('/cons/:consId/support')
    .patch(ACCESS_RULES.ALL_USER, validate(supportValidation.updateSupport), supportController.updateSupport);

router
    .route('/cons/:consId/support/:supportId/supportedAt')
    .patch(ACCESS_RULES.ALL_USER, validate(supportValidation.modifySupportedAt), supportController.modifySupportedAt);

router
    .route('/cons/:consId/support/:supportId/start')
    .post(ACCESS_RULES.ALL_USER, validate(supportValidation.startSupport), supportController.startSupport);

router
    .route('/cons/:consId/support/pause')
    .post(ACCESS_RULES.ALL_USER, validate(supportValidation.pauseSupport), supportController.pauseSupport);

router
    .route('/cons/:consId/support/end')
    .post(ACCESS_RULES.ALL_USER, validate(supportValidation.endSupport), supportController.endSupport);

router
    .route('/support/:supportId')
    .delete(ACCESS_RULES.ALL_USER, supportController.deleteSupport);

module.exports = router;
