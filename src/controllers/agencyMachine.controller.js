const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { agencyMachineService } = require('../services');

const getMachines = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {greater_than} = req.query;
    const {query} = req.query;
    const result = await agencyMachineService.getAgencyMachines(agencyId, greater_than, query);
    res.send(result);
});

const getMachineById = catchAsync(async (req, res) => {
    const {machineId} = req.params;
    const result = await agencyMachineService.getAgencyMachineById(machineId);
    res.send(result);
});

const createMachine = catchAsync(async (req, res) => {
    const result = await agencyMachineService.createAgencyMachine(req.params.agencyId, req.body);
    res.send(result);
});

const deleteMachineById = catchAsync(async (req, res) => {
    const {agencyId, agencyMachineId} = req.params;
    await agencyMachineService.deleteAgencyMachineById(agencyId, agencyMachineId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getMachines,
    getMachineById,
    createMachine,
    deleteMachineById,
};
