const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const disasterTypeService = require("../services/disasterType.service");

const getDisasterTypes = catchAsync(async (req, res) => {
    const {name, greater_than} = req.query;
    const result = await disasterTypeService.getDisasterType(name, greater_than);
    res.send(result);
});

const getDisasterType = catchAsync(async (req, res) => {
    const {disasterTypeId} = req.params;
    const result = await disasterTypeService.getDisasterTypeById(disasterTypeId);
    res.send(result);
});

const createDisasterType = catchAsync(async (req, res) => {
    const result = await disasterTypeService.createDisasterType(req.body);
    res.send(result);
});

const updateDisasterType = catchAsync(async (req, res) => {
    const {disasterTypeId} = req.params;
    const result = await disasterTypeService.updateDisasterType(disasterTypeId, req.body);
    res.send(result);
});

const deleteDisasterType = catchAsync(async (req, res) => {
    const {disasterTypeId} = req.params;
    await disasterTypeService.deleteDisasterTypeById(disasterTypeId, req.body);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getDisasterType,
    getDisasterTypes,
    createDisasterType,
    updateDisasterType,
    deleteDisasterType,
};
