const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const processService = require("../services/process.service");

const getProcesses = catchAsync(async (req, res) => {
    const {name} = req.query;
    const result = await processService.getProcesses(name);
    res.send(result);
});

const getProcess = catchAsync(async (req, res) => {
    const {processId} = req.params;
    const result = await processService.getProcessById(processId);
    res.send(result);
});

const createProcess = catchAsync(async (req, res) => {
    const result = await processService.createProcess(req.body);
    res.send(result);
});

const updateProcess = catchAsync(async (req, res) => {
    const {processId} = req.params;
    const result = await processService.updateProcess(processId, req.body);
    res.send(result);
});

const deleteProcess = catchAsync(async (req, res) => {
    const {processId} = req.params;
    await processService.deleteProcessById(processId, req.body);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getProcess,
    getProcesses,
    createProcess,
    updateProcess,
    deleteProcess,
};
