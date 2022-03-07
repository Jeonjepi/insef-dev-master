const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const agencyRiskFactorsService = require("../services/agencyRiskFactors.service");

const getAgencyRiskFactors = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {greater_than} = req.query;
    const result = await agencyRiskFactorsService.getAgencyRiskFactors(agencyId, greater_than);
    res.send(result);
});

const getAgencyRiskFactor = catchAsync(async (req, res) => {
    const {agencyId, agencyRiskFactorId} = req.params;
    const result = await agencyRiskFactorsService.getAgencyRiskFactorById(agencyId, agencyRiskFactorId);
    res.send(result);
});

const createAgencyRiskFactor = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const result = await agencyRiskFactorsService.createAgencyRiskFactor(agencyId, req.body);
    res.send(result);
});

const updateAgencyRiskFactor = catchAsync(async (req, res) => {
    const {agencyId, agencyRiskFactorId} = req.params;
    const result = await agencyRiskFactorsService.updateAgencyRiskFactor(agencyId, agencyRiskFactorId, req.body);
    res.send(result);
});

const deleteAgencyRiskFactor = catchAsync(async (req, res) => {
    const {agencyId, agencyRiskFactorId} = req.params;
    await agencyRiskFactorsService.deleteAgencyRiskFactorById(agencyId, agencyRiskFactorId);
    res.sendStatus(httpStatus.NO_CONTENT);
});
const getAgencyRiskFactorElementByElement = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {element, matching, distinct} = req.query;
    const result = [undefined, false].includes(matching) ?
        await agencyRiskFactorsService.getAgencyRiskFactorElementByElement(agencyId, element, distinct) :
        await agencyRiskFactorsService.getAgencyRiskFactorElementByMatchingElement(agencyId, element);
    return res.send(result);
});

const getAgencyRiskFactorFactorByFactor = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {element, factor} = req.query;
    const result = await agencyRiskFactorsService.getAgencyRiskFactorByFactor(agencyId, element, factor);
    res.send(result);
});

const getAgencyRiskFactorElementFactor = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {element, factor} = req.query;
    const result = await agencyRiskFactorsService.getAgencyRiskElementFactorById(agencyId, element, factor);
    res.send(result);
});

const getAgencyRiskMeasuresById = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {measures} = req.query;
    const result = await agencyRiskFactorsService.getAgencyRiskMeasuresById(agencyId, measures);
    res.send(result);
});

const getAgencyRiskMeasuresDetailById = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {measures, measures_detail} = req.query;
    const result = await agencyRiskFactorsService.getAgencyRiskMeasuresDetailById(agencyId, measures, measures_detail);
    res.send(result);
});

const getAgencyRiskMeasuresDetailAndRule = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const {measures} = req.query;
    const result = await agencyRiskFactorsService.getAgencyRiskMeasuresDetailAndRule(agencyId, measures);
    res.send(result);
});

module.exports = {
    getAgencyRiskFactor,
    getAgencyRiskFactors,
    createAgencyRiskFactor,
    updateAgencyRiskFactor,
    deleteAgencyRiskFactor,
    getAgencyRiskFactorElementByElement,
    getAgencyRiskFactorFactorByFactor,
    getAgencyRiskFactorElementFactor,
    getAgencyRiskMeasuresById,
    getAgencyRiskMeasuresDetailById,
    getAgencyRiskMeasuresDetailAndRule,
};
