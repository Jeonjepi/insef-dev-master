const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { agencyService, consService, supportService, reportService} = require('../services');

const getAgencies = catchAsync(async (req, res) => {
    const {greater_than, query} = req.query;
    const result = await agencyService.getAgencies(greater_than, query);
    res.send(result);
});

const getAgencyById = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const result = await agencyService.getAgencyById(agencyId);
    res.send(result);
});

const createAgency = catchAsync(async (req, res) => {
    const result = await agencyService.createAgency(req.body, req.file);
    res.send(result);
});

const updateAgencyById = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const result = await agencyService.updateAgencyById(agencyId, req.body, req.file);
    res.send(result);
});

const deleteAgencyById = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    await agencyService.deleteAgencyById(agencyId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

const getOverview = catchAsync(async (req, res) => {
    const {agencyId} = req.params;
    const recentSupport = await supportService.getRecentSupportsStatusByDayAndAgencyId(agencyId, 7);
    const newReport = await reportService.getRecentReportsByDayAndAgentId(agencyId, 7);
    const newCons = await consService.getRecentConsByAgencyIdAndDay(agencyId, 7);
    const supportCount = await supportService.getThisMonthSupportsCountGroupByAgentUserByAgencyId(agencyId);

    res.send({recentSupport, newReport, newCons, supportCount});
});

module.exports = {
    getAgencies,
    getAgencyById,
    createAgency,
    updateAgencyById,
    deleteAgencyById,
    getOverview,
};
