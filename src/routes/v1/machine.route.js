const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {machineValidation} = require('../../validations/');
const {machineController} = require('../../controllers/');

const router = express.Router();

router
    .route('/')
    .get(validate(machineValidation.getMachines), machineController.getMachines)
    .post(validate(machineValidation.createMachine), machineController.createMachine);

router
    .route('/:machineId')
    .get(validate(machineValidation.getMachineById), machineController.getMachineById)
    .delete(validate(machineValidation.deleteMachineById), machineController.deleteMachineById);

module.exports = router;
