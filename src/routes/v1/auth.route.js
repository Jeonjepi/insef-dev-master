const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const s3 = require("../../config/s3");

const router = express.Router();

router
    .post('/auth/register', s3.upload.single("us_thumbnail"), validate(authValidation.register), authController.register)
    .post('/auth/login', validate(authValidation.login), authController.login)
    .post('/auth/logout', validate(authValidation.logout), authController.logout)
    .post('/auth/check-password', validate(authValidation.checkEmailAndPassword), authController.checkEmailAndPassword)
    .post('/auth/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens)
    .post('/auth/change-password', validate(authValidation.changePassword), authController.changePassword)
    .post('/auth/send-verification-sms', validate(authValidation.sendVerificationSMS), authController.sendVerificationSMS)
    .post('/auth/send-verification-email', validate(authValidation.sendVerificationEmail), authController.sendVerificationEmail)
    .post('/auth/send-reset-password-email', validate(authValidation.sendResetPasswordEmail), authController.sendResetPasswordEmail)
    .post('/auth/send-register-agency-email', validate(authValidation.sendRegisterAgencyEmail), authController.sendRegisterAgencyEmail)
    .post('/auth/send-register-cons-company-email', validate(authValidation.sendRegisterConsCompanyEmail), authController.sendRegisterConsCompanyEmail)
    .post('/auth/reset-password', validate(authValidation.resetPassword), authController.resetPassword)
    .post('/auth/find-user', validate(authValidation.findUser), authController.findUser);
module.exports = router;
