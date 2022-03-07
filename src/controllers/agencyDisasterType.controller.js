const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const agencyDisasterType = require("../services/agencyDisasterType.service");

const getAgencyDisasterTypes = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {name, fields, greater_than} = req.query;
    const result = await agencyDisasterType.getAgencyDisasterType(agencyId, name, fields);
    res.send(result);
});

const getAgencyDisasterType = catchAsync(async (req, res) => {
    const {agencyDisasterTypeId} = req.params;
    const result = await agencyDisasterType.getAgencyDisasterTypeById(agencyDisasterTypeId);
    res.send(result);
});

const createAgencyDisasterType = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const result = await agencyDisasterType.createAgencyDisasterType(agencyId, req.body);
    res.send(result);
});

const updateAgencyDisasterType = catchAsync(async (req, res) => {
    const {agencyId, agencyDisasterTypeId} = req.params;
    const result = await agencyDisasterType.updateAgencyDisasterType(agencyId, agencyDisasterTypeId, req.body);
    res.send(result);
});

const deleteAgencyDisasterType = catchAsync(async (req, res) => {
    const {agencyId, agencyDisasterTypeId} = req.params;
    await agencyDisasterType.deleteAgencyDisasterTypeById(agencyId, agencyDisasterTypeId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getAgencyDisasterType,
    getAgencyDisasterTypes,
    createAgencyDisasterType,
    updateAgencyDisasterType,
    deleteAgencyDisasterType,
};
