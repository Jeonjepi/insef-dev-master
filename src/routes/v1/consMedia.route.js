const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require('../../config/s3');
const {ACCESS_RULES} = require("../../config/accessRules");
const {consMediaValidation} = require('../../validations/');
const {consMediaController} = require('../../controllers/');

const router = express.Router();
router
    .route('/:consId/media')
    .get(ACCESS_RULES.ALL_USER, validate(consMediaValidation.getConsMedia), consMediaController.getConsMedia)
    .post(ACCESS_RULES.ALL_USER, s3.upload.array("cm_media"), validate(consMediaValidation.createConsMedia), consMediaController.createConsMedia)
    .delete(ACCESS_RULES.ALL_USER, validate(consMediaValidation.deleteConsMedia), consMediaController.deleteConsMedia);

module.exports = router;