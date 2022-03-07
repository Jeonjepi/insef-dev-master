const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { consDivisionService } = require('../services');

const getConsDivision = catchAsync(async (req, res) => {
    const result = await consDivisionService.getConsDivision();
    res.send(result);
});

const createConsDivision = catchAsync(async (req, res) => {
    const result = await consDivisionService.createConsDivision(req.body);
    res.send(result);
});
const deleteConsDivisionById = catchAsync(async (req, res) => {
    const {consDivisionId} = req.params;
    await consDivisionService.deleteConsDivisionById(consDivisionId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    getConsDivision,
    deleteConsDivisionById,
    createConsDivision
};
