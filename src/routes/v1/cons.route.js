const express = require('express');
const validate = require('../../middlewares/validate');
const {ACCESS_RULES} = require("../../config/accessRules");
const {consValidation} = require('../../validations/');
const {consController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(consValidation.getCons), consController.getCons)
    .post(ACCESS_RULES.EXCLUDE_AGENT, validate(consValidation.createCons), consController.createCons);

router
    .route('/:consId')
    .get(ACCESS_RULES.ALL_USER, validate(consValidation.getConsById), consController.getConsById)
    .delete(ACCESS_RULES.EXCLUDE_AGENT, validate(consValidation.deleteCons), consController.deleteCons)
    .patch(ACCESS_RULES.EXCLUDE_AGENT, validate(consValidation.updateCons), consController.updateCons);

router
    .route('/:consId/close')
    .post(ACCESS_RULES.ALL_USER, validate(consValidation.closeConsById), consController.closeCons);

router
    .route('/:consId/close')
    .post(ACCESS_RULES.ALL_USER, validate(consValidation.closeConsById), consController.closeCons);

router
    .route('/agent/:agentId')
    .get(consController.getConsByAgentAndRatherThanDate);

router
    .route('/:consId/support')
    .get(ACCESS_RULES.ALL_USER, validate(consValidation.getConsSupports), consController.getConsSupports);

router
    .route('/:consId/agent')
    .patch(ACCESS_RULES.ALL_USER, validate(consValidation.updateConsAgentByAgentId), consController.updateConsAgentByAgentId);

module.exports = router;
