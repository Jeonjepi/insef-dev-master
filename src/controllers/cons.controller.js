const Jwt = require("jsonwebtoken");
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const {paginate} = require("../utils/pagination");
const { consService, supportService} = require('../services');

const createCons = catchAsync(async (req, res) => {
    const result = await consService.createCons(req.body);
    res.status(httpStatus.CREATED).send(result);
});

const getCons = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['filterBy', 'filterValue']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const pagination = paginate(filter, options);

    const result = await consService.getConsByAgencyId(filter, options)
    res.send(result);
});

const getConsById = catchAsync(async (req, res) => {
    const {consId} = req.params;
    const cons = await consService.getConsAndConsCompanyById(consId);
    // const supports = await supportService.getRecentSupportsStatusByConsId(consId);
    res.send(cons);
});

const getConsByAgentAndRatherThanDate = catchAsync(async (req, res) => {
    const {agentId} = req.params;
    const {greater_than} = req.query;
    const cons = await consService.getConsByAgentAndRatherThanDate(+agentId, greater_than);
    res.send(cons);
})

const updateCons = catchAsync(async (req, res) => {
    const result = await consService.updateConsById(req.params.consId, req.body)
    res.send(result);
});

const deleteCons = catchAsync(async (req, res) => {
    await consService.deleteConsById(req.params.consId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

const closeCons = catchAsync(async(req, res) => {
    await consService.closeConsById(req.params.consId, req.body);
    res.sendStatus(httpStatus.OK);
})

const getConsSupports = catchAsync(async(req, res) => {
    const result = await consService.getConsSupports(req.params.consId);
    res.send(result);
})

const updateConsAgentByAgentId = catchAsync(async (req, res) => {
    const {consId} = req.params;
    const {oldAgent, newAgent} = req.body;
    const result = await consService.updateConsAgentByAgentId(consId, oldAgent, newAgent);
    res.send(result);
});

module.exports = {
    createCons,
    getCons,
    getConsById,
    getConsByAgentAndRatherThanDate,
    getConsSupports,
    updateCons,
    deleteCons,
    closeCons,
    updateConsAgentByAgentId,
};
