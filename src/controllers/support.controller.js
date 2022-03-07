const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {supportService, reportService} = require("../services");
//     getRecentSupportByConsId,
//     getSupportsStatusByUserId,
//     getRecentSupportsStatusByConsId,
//     getRecentSupportsStatusByAgencyId,
//     getRecentSupportsStatusByDayAndAgencyId,
//     getThisMonthSupportsCountGroupByAgentUserByAgencyId,
//     createSupportByConsId,
//     assignSupportAgentByConsAndUserId,
//     startSupport,
//     pauseSupport,
//     endSupport,
const assignSupportAgentByConsAndUserId = catchAsync(async (req, res) => {
    const {consId, supportId} = req.params;
    const result = await supportService.assignSupportAgentByConsAndUserId(consId, supportId, req.body);
    res.sendStatus(httpStatus.OK);
});

const updateSupportAgentByConsAndUserId = catchAsync(async (req, res) => {
    const {consId} = req.params;
    const {us_id} = req.body;
    const result = await supportService.updateSupportAgentByConsAndUserId(consId, us_id);
    res.sendStatus(httpStatus.OK);
});

const createSupport = catchAsync(async(req,res) => {
    const {consId} = req.params;
    const support = await supportService.createSupportByConsId(consId, req.body);
    const report = await reportService.createConsReportBySupportId(consId, support.su_id);
    const result = await supportService.getSupportById(support.su_id);
    res.send({result, ...report});
})

const updateSupport = catchAsync(async(req,res) => {
    const {consId} = req.params;
    const {round} = req.query;
    const result = await supportService.updateSupportByConsId(consId, round, req.body);
    res.send(result);
})

const releaseSupportAgent = catchAsync(async (req, res) => {
    const {consId} = req.params;
    await supportService.releaseSupportAgentByConsId(consId);
    res.sendStatus(httpStatus.OK);
});

const startSupport = catchAsync(async (req, res) => {
    const {consId, supportId} = req.params;
    const support = await supportService.startSupportByConsId(consId, supportId);
    const result = await supportService.getSupportById(support.su_id);
    res.send(result);
})

const pauseSupport = catchAsync(async (req, res) => {
    await supportService.pauseSupportByConsId(req.params.consId);
    res.sendStatus(httpStatus.OK);
})

const endSupport = catchAsync(async (req, res) => {
    await supportService.endSupportByConsId(req.params.consId);
    res.sendStatus(httpStatus.OK);
});

const modifySupportedAt = catchAsync(async (req, res) => {
    const {consId, supportId} = req.params;
    const {su_supported_at} = req.body;
    const result = await supportService.modifySupportedAt(consId, supportId, su_supported_at);
    const support = await supportService.getSupportById(supportId);
    res.send(support);
})

const deleteSupport = catchAsync(async (req, res) => {
    const {supportId} = req.params;
    await supportService.deleteSupportById(supportId);
    res.sendStatus(httpStatus.OK);
})

module.exports = {
    assignSupportAgentByConsAndUserId,
    updateSupportAgentByConsAndUserId,
    createSupport,
    updateSupport,
    releaseSupportAgent,
    startSupport,
    pauseSupport,
    endSupport,
    modifySupportedAt,
    deleteSupport,
};
