const express = require('express');
const validate = require('../../middlewares/validate');
const s3 = require("../../config/s3");
const {ACCESS_RULES} = require("../../config/accessRules");
const {agencyMachineValidation} = require('../../validations/');
const {agencyMachineController} = require('../../controllers/');

const router = express.Router();

router
    .route('/:agencyId/machine')
    .get(validate(agencyMachineValidation.getMachines), agencyMachineController.getMachines)
    .post(validate(agencyMachineValidation.createMachine), agencyMachineController.createMachine);

router
    .route('/:agencyId/machine/:agencyMachineId')
    .get(validate(agencyMachineValidation.getMachineById), agencyMachineController.getMachineById)
    .delete(validate(agencyMachineValidation.deleteMachineById), agencyMachineController.deleteMachineById);

module.exports = router;
