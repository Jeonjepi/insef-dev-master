const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { consManagerService } = require('../services');

const getConsManager = catchAsync(async (req, res) => {
    const {consId} = req.params;
    const result = await consManagerService.getConsManagerByConsId(consId);
    res.send(result);
});

const getsssById = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const result = await consManagerService.getAgencyById(agencyId);
    res.send(result);
});

const createConsManager = catchAsync(async (req, res) => {
    const {consId} = req.params;
    const result = await consManagerService.createConsManager(consId, req.body);
    res.send(result);
});

const updateConsManager = catchAsync(async (req, res) => {
    const {consId, consManagerId} = req.params;
    const result = await consManagerService.updateConsManagerById(consId, consManagerId, req.body);
    res.send(result);
});

const deleteConsManager = catchAsync(async (req, res) => {
    const {consId, consManagerId} = req.params;
    await consManagerService.deleteConsManagerById(consId, consManagerId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getConsManager,
    createConsManager,
    updateConsManager,
    deleteConsManager,
};
