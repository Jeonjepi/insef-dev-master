const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userRiskFactors = require("../services/userRiskFactors.service");

const getUserRiskFactors = catchAsync(async (req, res) => {
    const {us_id} = req.body;
    const result = await userRiskFactors.getUserRiskFactors();
    res.send(result);
});

const getUserRiskFactor = catchAsync(async (req, res) => {
    const {greater_than} = req.query;
    const {userId} = req.params;
    const result = await userRiskFactors.getUserRiskFactorById(userId, greater_than);
    res.send(result);
});

const createUserRiskFactor = catchAsync(async (req, res) => {
    const {userId} = req.params;
    req.body.uf_us_id = userId;
    const result = await userRiskFactors.createUserRiskFactor(req.body);
    res.send(result);
});

const updateUserRiskFactor = catchAsync(async (req, res) => {
    const {userId, riskFactorId} = req.params;
    const result = await userRiskFactors.updateUserRiskFactor(userId, riskFactorId, req.body);
    res.send(result);
});

const deleteUserRiskFactor = catchAsync(async (req, res) => {
    const {userId, riskFactorId} = req.params;
    await userRiskFactors.deleteUserRiskFactorById(userId, riskFactorId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getUserRiskFactor,
    getUserRiskFactors,
    createUserRiskFactor,
    updateUserRiskFactor,
    deleteUserRiskFactor,
};
