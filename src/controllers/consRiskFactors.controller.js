const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const consRiskFactors = require("../services/consRiskFactors.service");
const {getConsRiskFactorById} = require("../services/consRiskFactors.service");


const getConsRiskFactors = catchAsync(async (req, res) => {
    const {greater_than} = req.query;
    const result = await consRiskFactors.getConsRiskFactors(greater_than);
    res.send(result);
});

const getConsRiskFactor = catchAsync(async (req, res) => {
    const {riskFactorId} = req.params;
    const result = await consRiskFactors.getConsRiskFactorById(riskFactorId);
    res.send(result);
});

const createConsRiskFactor = catchAsync(async (req, res) => {
    const result = await consRiskFactors.createConsRiskFactor(req.body);
    res.send(result);
});

const updateConsRiskFactor = catchAsync(async (req, res) => {
    const {riskFactorId} = req.params;
    const result = await consRiskFactors.updateConsRiskFactor(riskFactorId, req.body);
    res.send(result);
});

const deleteConsRiskFactor = catchAsync(async (req, res) => {
    const {riskFactorId} = req.params;
    await consRiskFactors.deleteConsRiskFactorById(riskFactorId, req.body);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getConsRiskFactor,
    getConsRiskFactors,
    createConsRiskFactor,
    updateConsRiskFactor,
    deleteConsRiskFactor,
};
