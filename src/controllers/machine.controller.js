const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { machineService } = require('../services');

const getMachines = catchAsync(async (req, res) => {
    const {greater_than} = req.query;
    const {query} = req.query;
    const result = await machineService.getMachines(greater_than, query);
    res.send(result);
});

const getMachineById = catchAsync(async (req, res) => {
    const {machineId} = req.params;
    const result = await machineService.getMachineById(machineId);
    res.send(result);
});

const createMachine = catchAsync(async (req, res) => {
    const machine = await machineService.createMachine(req.body);
    const result = await machineService.getMachineById(machine.mc_id);
    res.send(result);
});

const deleteMachineById = catchAsync(async (req, res) => {
    const {machineId} = req.params;
    await machineService.deleteMachineById(machineId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getMachines,
    getMachineById,
    createMachine,
    deleteMachineById,
};
